import styled from 'styled-components'
import Theme from '../../constants/theme'

export const Button = styled.button<{
  height: number
  width: number
  unit: string
}>`
  display: flex;
  width: ${(props) => (props.width ? props.width + props.unit : '120px')};
  height: ${(props) => props.height || 32}px;
  padding: 9px 19px 9px 18px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--NEW-Cutesy, #ff8ea5);
  background: #fff;
  box-shadow: 0px 4px 4px 0px #bdf4ff;
`
