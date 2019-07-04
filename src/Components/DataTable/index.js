import React from 'react';
import { Container, Table, THead, TH, TBody, TRow, TColumn } from './styles';
import Searchbar from 'Components/Searchbar';
import Pagination from 'Components/Pagination';
import PropTypes from 'prop-types';

export default function DataTable({
  columns,
  data,
  renderItem,
  textSearch,
  onSearch,
  paginationOnChange,
  page,
  perPage,
  total
}) {
  return (
    <Container>
      <Searchbar value={textSearch} onSearch={onSearch} />
      <Table border={0} cellSpacing={0} cellPadding={0}>
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
                <TColumn key={columnIndex}>
                  {renderItem(column.id, item)}
                </TColumn>
              ))}
            </TRow>
          ))}
        </TBody>
      </Table>
      <Pagination
        page={page}
        total={total}
        perPage={perPage}
        paginationOnChange={paginationOnChange}
      />
    </Container>
  );
}

DataTable.prototype = {
  columns: PropTypes.array,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  textSearch: PropTypes.string,
  onSearch: PropTypes.func,
  paginationOnChange: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number
};
