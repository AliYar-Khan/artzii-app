import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Button = styled.button<{
  height: number
  width: number
  unit: string
}>`
  width: ${(props) => (props.width ? props.width + props.unit : '120px')};
  height: ${(props) => props.height || 32}px;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #ff8ea5, #cc95ff, #88e7ff) border-box !important;
  border-radius: 4px;
  border: 1px solid transparent !important;
  box-shadow: 0px 4px 4px 0px #bdf4ff !important;
  color: ${Theme.BLACK_COLOR};
  font-weight: bold;
  margin-right: 50px;
  cursor: pointer;
`
export const Row = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
`

export const Col = styled.div<{
  flex: number
}>`
  display: flex;
  flex: ${(props) => props.flex};
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`
export const MenuHeading = styled.span`
  font-weight: bold;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  color: #121212;
  text-align: left;
`

export const MenuQuality = styled.span`
  font-weight: light;
  font-size: 11px;
  font-family: 'Poppins', sans-serif;
  color: #121212;
  text-align: left;
`
