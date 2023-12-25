import React from 'react'
import { observer } from 'mobx-react-lite'
import { Position, Menu, Popover } from '@blueprintjs/core'
// import { HTMLSelect, Slider } from '@blueprintjs/core'
// import JSZip from 'jszip'
// import { downloadFile } from 'polotno/utils/download'
// import * as unit from 'polotno/utils/unit'
import JPGICON from '../../assets/image_icon.png'
import PDFICON from '../../assets/pdf_icon.png'
import { Button, Row, Col, MenuHeading, MenuQuality } from './style'

export const DownloadButton = observer(({ store }: any) => {
  const [saving, setSaving] = React.useState(false)
  const [quality, setQuality] = React.useState(1)
  const [pageSizeModifier, setPageSizeModifier] = React.useState(1)
  // const [fps, setFPS] = React.useState(10)
  // const [type, setType] = React.useState('png')

  const getName = () => {
    const texts: String[] = []
    store.pages.forEach((p: any) => {
      p.children.forEach((c: any) => {
        if (c.type === 'text') {
          texts.push(c.text)
        }
      })
    })
    const allWords = texts.join(' ').split(' ')
    const words = allWords.slice(0, 6)
    return words.join(' ').replace(/\s/g, '-').toLowerCase() || 'polotno'
  }

  return (
    <Popover
      content={
        <Menu>
          <Row>
            <Col flex={0}>
              <img
                src={JPGICON}
                width={16}
                height={20}
                style={{ marginTop: 5 }}
                alt='jpg web quality'
              />
            </Col>
            <Col flex={3}>
              <Row>
                <MenuHeading>JPG</MenuHeading>
              </Row>
              <Row>
                <MenuQuality>Web Quality</MenuQuality>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col flex={0}>
              <img
                src={JPGICON}
                width={16}
                height={20}
                style={{ marginTop: 5 }}
                alt='png web quality'
              />
            </Col>
            <Col flex={3}>
              <Row>
                <MenuHeading>PNG</MenuHeading>
              </Row>
              <Row>
                <MenuQuality>Web Quality</MenuQuality>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col flex={0}>
              <img
                src={JPGICON}
                width={16}
                height={20}
                style={{ marginTop: 5 }}
                alt='png print quality'
              />
            </Col>
            <Col flex={3}>
              <Row>
                <MenuHeading>PNG</MenuHeading>
              </Row>
              <Row>
                <MenuQuality>Print Quality</MenuQuality>
              </Row>
            </Col>
          </Row>
          <Row
            onClick={async () => {
              setSaving(true)
              await store.saveAsPDF({
                fileName: getName() + '.pdf',
                dpi: store.dpi / pageSizeModifier,
                pixelRatio: 2 * quality
              })
              setSaving(false)
            }}
          >
            <Col flex={0}>
              <img
                src={PDFICON}
                width={16}
                height={20}
                style={{ marginTop: 5 }}
                alt='pdf web quality'
              />
            </Col>
            <Col flex={3}>
              <Row>
                <MenuHeading>PDF</MenuHeading>
              </Row>
              <Row>
                <MenuQuality>Web Quality</MenuQuality>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col flex={0}>
              <img
                src={PDFICON}
                width={16}
                height={20}
                style={{ marginTop: 5 }}
                alt='pdf print quality'
              />
            </Col>
            <Col flex={3}>
              <Row>
                <MenuHeading>PDF</MenuHeading>
              </Row>
              <Row>
                <MenuQuality>Print Quality</MenuQuality>
              </Row>
            </Col>
          </Row>
          {/* <li className='bp5-menu-header'>
            <h6 className='bp5-heading'>File type</h6>
          </li>
          <HTMLSelect
            fill
            onChange={(e) => {
              setType(e.target.value)
              setQuality(1)
            }}
            value={type}
          >
            <option value='jpeg'>JPEG</option>
            <option value='png'>PNG</option>
            <option value='pdf'>PDF</option>
          </HTMLSelect>

          {type !== 'html' && (
            <>
              <li className='bp5-menu-header'>
                <h6 className='bp5-heading'>Quality</h6>
              </li>
              <div style={{ padding: '10px' }}>
                <Slider
                  value={quality}
                  labelRenderer={false}
                  onChange={(quality) => {
                    setQuality(quality)
                  }}
                  stepSize={0.2}
                  min={0.2}
                  max={300 / 72}
                  showTrackFill={false}
                />
                {type === 'pdf' && (
                  <div>DPI: {Math.round(store.dpi * quality)}</div>
                )}
                {type !== 'pdf' && (
                  <div>
                    {Math.round(store.width * quality)} x{' '}
                    {Math.round(store.height * quality)} px
                  </div>
                )}
              </div>
              {type === 'pdf' && (
                <>
                  <li className='bp5-menu-header'>
                    <h6 className='bp5-heading'>Page Size</h6>
                  </li>
                  <div style={{ padding: '10px' }}>
                    <Slider
                      value={pageSizeModifier}
                      labelRenderer={false}
                      onChange={(pageSizeModifier) => {
                        setPageSizeModifier(pageSizeModifier)
                      }}
                      stepSize={0.2}
                      min={0.2}
                      max={3}
                      showTrackFill={false}
                    />

                    <div>
                      {unit.pxToUnitRounded({
                        px: store.width * pageSizeModifier,
                        dpi: store.dpi,
                        precious: 0,
                        unit: 'px'
                      })}{' '}
                      x{' '}
                      {unit.pxToUnitRounded({
                        px: store.height * pageSizeModifier,
                        dpi: store.dpi,
                        precious: 0,
                        unit: 'px'
                      })}{' '}
                      px
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <Button
            width={100}
            unit='%'
            height={43}
            onClick={async () => {
              if (type === 'pdf') {
                setSaving(true)
                await store.saveAsPDF({
                  fileName: getName() + '.pdf',
                  dpi: store.dpi / pageSizeModifier,
                  pixelRatio: 2 * quality
                })
                setSaving(false)
              } else {
                setSaving(true)
                if (store.pages.length < 3) {
                  store.pages.forEach((page: { id: any }, index: number) => {
                    // do not add index if we have just one page
                    const indexString =
                      store.pages.length > 1 ? '-' + (index + 1) : ''
                    store.saveAsImage({
                      pageId: page.id,
                      pixelRatio: quality,
                      mimeType: 'image/' + type,
                      fileName: getName() + indexString + '.' + type
                    })
                  })
                } else {
                  const zip = new JSZip()
                  for (const page of store.pages) {
                    const index = store.pages.indexOf(page)
                    const indexString =
                      store.pages.length > 1 ? '-' + (index + 1) : ''

                    const url = await store.toDataURL({
                      pageId: page.id,
                      pixelRatio: quality,
                      mimeType: 'image/' + type
                    })
                    const fileName = getName() + indexString + '.' + type
                    const base64Data = url.replace(
                      /^data:image\/(png|jpeg);base64,/,
                      ''
                    )
                    zip.file(fileName, base64Data, { base64: true })
                  }

                  const content = await zip.generateAsync({ type: 'base64' })
                  const result = 'data:application/zip;base64,' + content
                  console.log(content)
                  downloadFile(result, getName() + '.zip')
                }
                setSaving(false)
              }
            }}
          >
            {saving ? (
              <span style={{ justifyContent: 'center', alignItems: 'center' }}>
                Saving...
              </span>
            ) : (
              `Download ${type.toUpperCase()}`
            )}
          </Button> */}
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Button width={0} unit='px' height={0}>
        Download
      </Button>
    </Popover>
  )
})
