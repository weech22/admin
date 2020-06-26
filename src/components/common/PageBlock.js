import styled from 'styled-components'

const PageBlock = styled.div`
  display: flex;
  min-width: 330px;
  max-width: 330px;
  padding-right: 20px;
  padding-left: 10px;
  margin: 20px 10px 10px 10px;
  background: transparent;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`

export default PageBlock
