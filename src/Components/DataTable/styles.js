import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  padding: 10px;
  margin: 10px 0;
`;

export const THead = styled.thead`
  width: 100%;
  height: 30px;
`;

export const TH = styled.th`
  padding: 10px;
  color: #000000;
  text-align: left;
  color: #000000;
`;

export const TBody = styled.tbody``;

export const TRow = styled.tr`
  ${props =>
    props.noHover
      ? ''
      : `
    &:hover {
      background-color: #f0f0f0;
      cursor: pointer;
    }
  `}

  @media (max-width: 575px) {
    &:nth-child(${props => props.columnsLength || 3}n + 1) {
      background: #f5f5f5;
    }
  }
`;

export const TColumn = styled.td`
  padding: ${props => (props.noPadding ? 0 : 10)}px;
  color: #666666;
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => {
    const arr = props.children.filter(c => c).map(c => c);
    let fr = [];
    arr.forEach((c, i) =>
      i === arr.length - 1 ? fr.push('3fr') : fr.push('1fr')
    );

    return fr.join(' ');
  }};
  grid-gap: 10px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 575px) {
    grid-gap: 10px;
    grid-template-columns: 1fr;
  }
`;
