import styled from 'styled-components'
import { ifExpression } from '../../utils/functions'

const ifSelected = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'selected')

const ifInsertButton = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'isInsertButton')

const ifWithoutOpacity = (onTrue, onFalse) =>
  ifExpression(onTrue, onFalse, 'withoutOpacity')

export const Container = styled.div`
  cursor: pointer;
  background: ${ifSelected(
    'linear-gradient(166.14deg, #F49355 0%, #F0640C 100%)',
    '#fff',
  )};
  box-shadow: 0px 6px 14px rgba(2, 9, 75, 0.06);
  border-radius: 8px;
  padding: 16px 0 12px 20px;
  margin-top: 4px;
`

export const SubcategoryWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const SubcategoryContainer = styled(Container)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  padding: 0 15px;
  margin: 2px 0 0 11px;
  padding-right: ${ifSelected(10, 15)}px;
  border-top-right-radius: ${ifSelected(0, 8)}px;
  border-bottom-right-radius: ${ifSelected(0, 8)}px;
`

export const SubcategoryTitle = styled.div`
  font-family: FuturaBookC;
  font-size: 17px;
  letter-spacing: 0.02em;
  color: ${ifInsertButton('#F0640C', ifSelected('#fff', '#000'))};
  opacity: ${ifSelected(1, 0.6)};
`

export const CategoryTitle = styled.div`
  font-family: FuturaBookC;
  font-size: 20px;
  line-height: 23px;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifSelected(1, 0.6)};
  margin: 0;
  margin-top: 4px;
  padding: 0;
`

export const CategoryType = styled.span`
  font-family: FuturaBookC;
  font-size: 15px;
  line-height: 17px;
  color: ${ifSelected('#fff', '#000')};
  opacity: ${ifSelected(0.6, 0.3)};
`

export const SubcategoryProductsText = styled.div`
  font-family: FuturaDemiC;
  font-size: 13px;
  height: 17px;
  width: 17px;
  text-align: center;
  color: #000;
  opacity: ${ifWithoutOpacity(1, 0.4)};
`
