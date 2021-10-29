import styled, {css} from 'styled-components'

const Flex = styled.div`
  display: flex;
  position: ${({position}) => position};
  width: ${({width}) => width};
  margin: ${({margin}) => margin};
  ${({center}) =>
    center &&
    css`
      justify-content: center;
      align-items: center;
    `};
  ${({justifyEnd}) =>
    justifyEnd &&
    css`
      justify-content: flex-end;
      align-items: center;
    `};
  ${({itemEnd}) =>
    itemEnd &&
    css`
      align-items: flex-end;
    `};
  ${({itemCenter}) =>
    itemCenter &&
    css`
      align-items: center;
    `};
  ${({flexEnd}) =>
    flexEnd &&
    css`
      justify-content: flex-end;
      align-items: flex-end;
    `};
  ${({full}) =>
    full &&
    css`
      width: 100%;
      height: 100%;
    `};
  ${({justifyStart}) =>
    justifyStart &&
    css`
      justify-content: flex-start;
    `};
  ${({col}) =>
    col &&
    css`
      flex-direction: column;
    `};
  ${({justifyBetween}) =>
    justifyBetween &&
    css`
      justify-content: space-between;
    `};
  ${({justifyAround}) =>
    justifyAround &&
    css`
      justify-content: space-around;
    `};
  ${({wraper}) =>
    wraper &&
    css`
      flex-wrap: wrap;
    `};
`
export default Flex
