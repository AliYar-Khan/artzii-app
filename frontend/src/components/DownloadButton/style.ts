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
    linear-gradient(to right, #ff8ea5, #cc95ff, #88e7ff) border-box;
  border-radius: 4px;
  border: 1px solid transparent;
  color: ${Theme.BLACK_COLOR};
  font-weight: bold;
  margin-right: 50px;
  cursor: pointer;
`
