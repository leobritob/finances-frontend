import React, { useState } from 'react';
import { Container, Table, THead, TH, TBody, TRow, TColumn, Input, FilterContainer } from './styles';
import Searchbar from 'Components/Searchbar';
import Pagination from 'Components/Pagination';
import PropTypes from 'prop-types';
import Button from 'Components/Button';
import DatePicker from 'Components/DatePicker';
import { compareAsc } from 'date-fns';

export default function DataTable({
  itemOnClick,
  searchBarIsVisible,
  addButtonIsVisible,
  addButtonOnClick,
  columns,
  data,
  renderItem,
  searchBarPlaceholder,
  searchBarValue,
  searchBarOnChange,
  searchBarOnClick,
  paginationOnChange,
  page,
  perPage,
  total,
  fromIsVisible,
  fromValue,
  fromOnChange,
  toIsVisible,
  toValue,
  toOnChange
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);

  window.addEventListener('resize', e => {
    setIsMobile(e.target.innerWidth <= 575);
  });

  const compareDates = compareAsc(fromValue, toValue);
  if (compareDates === 1) {
    toOnChange(fromValue);
  }

  return (
    <Container>
      {addButtonIsVisible && <Button label="Novo" icon="plus" onClick={addButtonOnClick} />}

      <FilterContainer>
        {fromIsVisible && (
          <DatePicker
            placeholderText="Data inicial"
            selected={fromValue}
            onChange={fromOnChange}
            customInput={<Input />}
          />
        )}
        {toIsVisible && (
          <DatePicker placeholderText="Data final" selected={toValue} onChange={toOnChange} customInput={<Input />} />
        )}
        {searchBarIsVisible && (
          <Searchbar
            value={searchBarValue}
            placeholder={searchBarPlaceholder}
            onChange={searchBarOnChange}
            onClick={searchBarOnClick}
          />
        )}
      </FilterContainer>
      <Table border={0} cellSpacing={0} cellPadding={0}>
        {isMobile && (
          <TBody>
            {data.map((data, dataIndex) => {
              return columns.map((column, columnIndex) => (
                <TRow key={columnIndex} onClick={() => (columnIndex === columns.length - 1 ? {} : itemOnClick(data))}>
                  <TH>{column.label}</TH>
                  <TColumn>{renderItem(column.id, data)}</TColumn>
                </TRow>
              ));
            })}
          </TBody>
        )}

        {!isMobile && (
          <>
            <THead>
              <TRow noHover>
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
                    <TColumn
                      key={columnIndex}
                      noPadding={column.noPadding || false}
                      onClick={() => (columnIndex === columns.length - 1 ? {} : itemOnClick(item))}
                    >
                      {renderItem(column.id, item)}
                    </TColumn>
                  ))}
                </TRow>
              ))}
            </TBody>
          </>
        )}
      </Table>
      <Pagination page={page} total={total} perPage={perPage} paginationOnChange={paginationOnChange} />
    </Container>
  );
}

DataTable.prototype = {
  columns: PropTypes.array,
  data: PropTypes.array,
  itemOnClick: PropTypes.func,
  renderItem: PropTypes.func,
  searchBarPlaceholder: PropTypes.string,
  searchBarValue: PropTypes.string,
  searchBarOnChange: PropTypes.func,
  searchBarOnClick: PropTypes.func,
  paginationOnChange: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  addButtonIsVisible: PropTypes.bool,
  addButtonOnClick: PropTypes.func,
  searchBarIsVisible: PropTypes.bool,
  fromIsVisible: PropTypes.bool,
  fromValue: PropTypes.text,
  fromOnChange: PropTypes.func,
  toIsVisible: PropTypes.bool,
  toValue: PropTypes.text,
  toOnChange: PropTypes.func
};

DataTable.defaultProps = {
  columns: [],
  data: [],
  itemOnClick: () => {},
  addButtonIsVisible: false,
  addButtonOnClick: () => {},
  searchBarIsVisible: false,
  searchBarPlaceholder: 'Pesquisar pela descricão',
  searchBarValue: '',
  searchBarOnClick: () => {},
  searchBarOnChange: () => {},
  fromIsVisible: false,
  fromValue: new Date(),
  fromOnChange: () => {},
  toIsVisible: false,
  toValue: new Date(),
  toOnChange: () => {}
};
