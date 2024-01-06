import React, { useState, useEffect } from 'react'
import {
  Container,
  Wrapper,
  Left,
  Right,
  Logo,
  UpgradeButton,
  AvatarIcon,
  BellIcon,
  SettingsIcon
} from './style'
import logo from '../../assets/artzLogo.png'
// import avatarImg from '../../assets/avatarImg.png'
import accountIcon from '../../assets/accountIcon.png'
import { useLocation } from 'react-router-dom'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from 'antd'
import { InputContainer } from '../Designer/style'
import { useStores } from 'src/store/rootStore'
interface Props {
  handleSettingsClick: () => void
  handleUpgradeClick: () => void
  handleAICreditClick: () => void
  activeTab: number
}

const Header = ({
  handleSettingsClick,
  handleUpgradeClick,
  handleAICreditClick,
  activeTab
}: Props): JSX.Element => {
  const [designName, setDesignName] = useState<any>('')
  const store = useStores()
  const location = useLocation()
  const channelPath = location.pathname

  useEffect(() => {
    if (designName) {
      store.designStore.updateDesignName(designName)
    }
  }, [designName])

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo src={logo} />
        </Left>
        {channelPath === '/dashboard' ? (
          <Right>
            <UpgradeButton onClick={handleAICreditClick}>
              + AI Credits
            </UpgradeButton>
            <UpgradeButton onClick={handleUpgradeClick}>Upgrade</UpgradeButton>
            <BellIcon>
              <FontAwesomeIcon
                icon={solid('bell')}
                style={{ width: '17px', backgroundColor: 'white' }}
              />
            </BellIcon>
            <SettingsIcon onClick={handleSettingsClick}>
              <FontAwesomeIcon
                icon={solid('gear')}
                style={{ width: '17px', backgroundColor: 'white' }}
              />
            </SettingsIcon>
            <AvatarIcon>
              <Avatar
                size={{ xs: 24, sm: 32, md: 46, lg: 46, xl: 46, xxl: 46 }}
                src={accountIcon}
              />
            </AvatarIcon>
            {activeTab === 2 ? (
              <InputContainer
                value={designName}
                onChange={(event) => {
                  setDesignName(event.target.value)
                }}
                placeholder='name'
                type='text'
              ></InputContainer>
            ) : null}
          </Right>
        ) : null}
      </Wrapper>
    </Container>
  )
}

export default Header
