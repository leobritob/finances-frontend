import React, { useState } from 'react';
import { Container, Table, THead, TH, TBody, TRow, TColumn } from './styles';
import Searchbar from 'Components/Searchbar';
import Pagination from 'Components/Pagination';
import PropTypes from 'prop-types';
import Button from 'Components/Button';

export default function DataTable({
  searchBarIsVisible,
  addButtonIsVisible,
  addButtonOnClick,
  columns,
  data,
  renderItem,
  searchBarValue,
  searchBarOnChange,
  searchBarOnClick,
  paginationOnChange,
  page,
  perPage,
  total
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);

  window.addEventListener('resize', e => {
    setIsMobile(e.target.innerWidth <= 575);
  });

  return (
    <Container>
      {addButtonIsVisible && (
        <Button label="Novo" icon="plus" onClick={addButtonOnClick} />
      )}
      {searchBarIsVisible && (
        <Searchbar
          value={searchBarValue}
          onChange={searchBarOnChange}
          onClick={searchBarOnClick}
        />
      )}
      <Table border={0} cellSpacing={0} cellPadding={0}>
        {isMobile && (
          <>
            <TBody>
              {data.map((data, dataIndex) => {
                return columns.map((column, columnIndex) => (
                  <TRow key={columnIndex}>
                    <TH>{column.label}</TH>
                    <TColumn>{renderItem(column.id, data)}</TColumn>
                  </TRow>
                ));
              })}
            </TBody>
          </>
        )}

        {!isMobile && (
          <>
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
          </>
        )}
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
  searchBarValue: PropTypes.string,
  searchBarOnChange: PropTypes.func,
  searchBarOnClick: PropTypes.func,
  paginationOnChange: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  addButtonIsVisible: PropTypes.bool,
  addButtonOnClick: PropTypes.func,
  searchBarIsVisible: PropTypes.bool
};

DataTable.defaultProps = {
  columns: [],
  data: [],
  addButtonIsVisible: false,
  addButtonOnClick: () => {},
  searchBarIsVisible: false,
  searchBarValue: '',
  searchBarOnClick: () => {},
  searchBarOnChange: () => {}
};
