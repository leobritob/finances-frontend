import React from 'react';
import { Container, THead, TH, TBody, TRow, TColumn } from './styles';

export default function DataTable({ columns, data, renderItem }) {
  return (
    <Container border={0} cellSpacing={0} cellPadding={0}>
      <THead>
        <TRow>
          {columns.map((column, columnIndex) => (
            <TH key={columnIndex} width={column.width}>
              {column.label}
            </TH>
          ))}
        </TRow>
      </THead>
      <TBody>
        {data.map((item, dataIndex) => (
          <TRow key={dataIndex}>
            {columns.map((column, columnIndex) => (
              <TColumn key={columnIndex}>{renderItem(column.id, item)}</TColumn>
            ))}
          </TRow>
        ))}
      </TBody>
    </Container>
  );
}
