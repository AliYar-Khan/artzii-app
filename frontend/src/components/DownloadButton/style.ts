import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Button = styled.button<{
  height: number
  width: number
  unit: string
}>`
  width: ${(props) => (props.width ? props.width + props.unit : '120px')};
  height: ${(props) => props.height || 32}px;
  background: #ffffff;
  box-shadow: 0px 4px 4px #bdf4ff;
  border-radius: 4px;
  border-image: linear-gradient(
      90deg,
      rgba(255, 142, 165, 0.87) 25.21%,
      rgba(204, 149, 255, 0.87) 51.28%,
      rgba(136, 231, 255, 0.87) 75.62%
    )
    1 !important;
  color: ${Theme.BLACK_COLOR};
  margin-right: 50px;
  cursor: pointer;
`
