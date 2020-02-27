import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Container, Table, THead, TH, TBody, TRow, TColumn, FilterContainer } from './styles';
import Searchbar from 'Components/Searchbar';
import Pagination from 'Components/Pagination';
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
  toOnChange,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);

  window.addEventListener('resize', e => {
    setIsMobile(e.target.innerWidth <= 575);
  });

  const compareDates = compareAsc(fromValue, toValue);
  if (compareDates === 1) {
    toOnChange(fromValue);
  }

  const TableBodyForMobile = useMemo(
    () =>
      data.map(data =>
        columns.map((column, columnIndex) => (
          <TRow
            key={columnIndex}
            onClick={() => (columnIndex === columns.length - 1 ? {} : itemOnClick(data))}
            columnsLength={columns.length}
          >
            <TH>{column.label}</TH>
            <TColumn>{renderItem(column.id, data)}</TColumn>
          </TRow>
        ))
      ),
    [data, columns, renderItem, itemOnClick]
  );

  const TableBodyForDesktop = useMemo(
    () =>
      data.map((item, dataIndex) => (
        <TRow key={dataIndex}>
          {columns.map((column, columnIndex) => (
            <TColumn
              key={columnIndex}
              noPadding={column.noPadding || false}
              onClick={() => (columnIndex === columns.length - 1 ? {} : itemOnClick(item))}
            >
              <span>{renderItem(column.id, item)}</span>
            </TColumn>
          ))}
        </TRow>
      )),
    [data, columns, renderItem, itemOnClick]
  );

  const TableHeader = useMemo(
    () =>
      columns.map((column, columnIndex) => (
        <TH key={columnIndex} width={column.width}>
          {column.label}
        </TH>
      )),
    [columns]
  );

  return (
    <Container>
      {addButtonIsVisible && <Button styleButton="primary" label="Novo" icon="plus" onClick={addButtonOnClick} />}

      <FilterContainer>
        {fromIsVisible && <DatePicker placeholderText="Data inicial" selected={fromValue} onChange={fromOnChange} />}
        {toIsVisible && <DatePicker placeholderText="Data final" selected={toValue} onChange={toOnChange} />}
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
        {isMobile && <TBody>{TableBodyForMobile}</TBody>}

        {!isMobile && (
          <>
            <THead>
              <TRow noHover>{TableHeader}</TRow>
            </THead>
            <TBody>{TableBodyForDesktop}</TBody>
          </>
        )}
      </Table>
      <Pagination page={page} total={total} perPage={perPage} paginationOnChange={paginationOnChange} />
    </Container>
  );
}

DataTable.propTypes = {
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
  fromValue: PropTypes.string,
  fromOnChange: PropTypes.func,
  toIsVisible: PropTypes.bool,
  toValue: PropTypes.string,
  toOnChange: PropTypes.func,
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
  toOnChange: () => {},
};
