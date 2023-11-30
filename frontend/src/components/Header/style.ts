import styled from 'styled-components'
import { mobile } from '../../utils/responsive'
import Theme from '../../constants/theme'

export const Container = styled.div`
  height: 100px
  ${mobile({ height: '50px' })}
`

export const Wrapper = styled.div`
  padding: 20px 20px
  display: flex
  flex: 10
  align-items: center
  justify-content: space-between
  position: fixed
  top: 0
  z-index: 1000
  width: -webkit-fill-available
  width: -moz-available
  height: 89px
  box-shadow: 0px 5px 15px -2px grey
  background-color: red
  ${mobile({ padding: '25px 0px' })}
`

export const Left = styled.div`
  flex: 1
  display: flex
  align-items: center
`

export const Right = styled.div`
  flex: 1
  display: flex
  align-items: center
  justify-content: flex-end
  padding-right: 30px
  background-color: white
  ${mobile({ flex: 2, justifyContent: 'center', paddingRight: '0px' })}
`

export const Center = styled.div`
  flex: 1
  text-align: center
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
`

export const Branding = styled.h1<{ fontColor: string }>`
  font-size: 20px
  cursor: pointer
  font-weight: bold
  letter-spacing: 1.5px
  color: ${(p) => p.fontColor}
  ${mobile({ marginLeft: '160px', fontSize: '18px' })}
`

export const Logo = styled.img`
  cursor: pointer
  width: auto
  height: auto
  position: absolute
  background-color: transparent
  ${mobile({
    marginTop: '15px',
    marginLeft: '-40px',
    position: 'absolute',
    width: '200px',
    height: 'auto'
  })}
`

export const MenuItem = styled.div`
  font-size: 18px
  font-weight: bold
  letter-spacing: 1.5px
  cursor: pointer
  margin-right: 25px
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

export const Link = styled.a<{ fontColor: string }>`
  color: ${(p) => p.fontColor}
  list-style: none
  font-weight: bold
  letter-spacing: 1px
  text-decoration: none
  margin-left: 20px
  ${mobile({ marginLeft: '8px' })}
`

export const UpgradeButton = styled.button`
  width: 100px
  height: 50px
  background: #ffffff
  box-shadow: 0px 4px 4px #bdf4ff
  border-radius: 4px
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important
  color: ${Theme.BLACK_COLOR}
  margin-right: 50px
  cursor: pointer
`

export const BellIcon = styled.div`
  margin-left: 30px
  margin-right: 30px
  cursor: pointer
  background: white !important
`
export const SettingsIcon = styled.div`
  margin-left: 30px
  margin-right: 30px
  cursor: pointer
  background: white !important
`

export const AvatarIcon = styled.div`
  margin-left: 30px
  margin-right: 0px
  cursor: pointer
  background: white !important
`
