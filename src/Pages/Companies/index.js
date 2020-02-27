import React, { useState, useEffect, useCallback } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import DataTable from 'Components/DataTable';
import Breadcrumbs from 'Components/Breadcrumbs';
import { history } from 'Config/Store';
import Button from 'Components/Button';
import Colors from 'Themes/Colors';
import useCompanies from 'Hooks/useCompanies';

export default function Companies() {
  const [searchBarValue, setSearchBarValue] = useState('');
  const { filterDebounce, setFilter, companies, getAllCompanies, deleteCompanyById } = useCompanies();

  useEffect(() => {
    getAllCompanies({ ...filterDebounce, perPage: 20 });
  }, [getAllCompanies, filterDebounce]);

  const _removeItem = useCallback(
    id => {
      const isDelete = window.confirm('Você tem certeza que deseja remover este item ?');
      if (isDelete) {
        deleteCompanyById(id);
      }
    },
    [deleteCompanyById]
  );

  const renderItem = useCallback(
    (column, item) => {
      switch (column) {
        case '-':
          return (
            <Button
              styleButton="danger"
              onClick={() => _removeItem(item.id)}
              backgroundColor={Colors.expenses}
              height={25}
              icon="trash"
              iconSize="xs"
              noMargin
              noBorder
            />
          );
        default:
          return item[column];
      }
    },
    [_removeItem]
  );

  const _searchBarHandler = useCallback(
    e => {
      const search = e.target.value;

      setSearchBarValue(search);
      setFilter(prevState => ({ ...prevState, search }));
    },
    [setFilter]
  );

  const _handlePagination = useCallback(
    page => {
      setFilter(prevState => ({ ...prevState, page }));
    },
    [setFilter]
  );

  const _searchBarOnClick = useCallback(
    search => {
      setFilter(prevState => ({ ...prevState, search }));
    },
    [setFilter]
  );

  const _addButtonOnClick = useCallback(() => {
    history.push('/companies/add');
  }, []);

  const _itemOnClick = useCallback(item => {
    history.push(`/companies/edit/${item.id}`);
  }, []);

  return (
    <Container>
      <Breadcrumbs data={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Empresas' }]} />
      <Title>Empresas</Title>

      <DataTable
        itemOnClick={_itemOnClick}
        renderItem={renderItem}
        columns={[
          { id: 'fantasy_name', label: 'Nome Fantasia' },
          { id: 'social_name', label: 'Razão Social' },
          { id: 'cnpj', label: 'CNPJ' },
          { id: '-', label: '-', width: 80, noPadding: true },
        ]}
        data={companies.data}
        page={companies.page}
        perPage={companies.perPage}
        total={companies.total}
        paginationOnChange={_handlePagination}
        addButtonIsVisible={true}
        addButtonOnClick={_addButtonOnClick}
        searchBarIsVisible={true}
        searchBarPlaceholder="Pesquise pelo nome fantasia, razão social ou CNPJ"
        searchBarValue={searchBarValue}
        searchBarOnChange={_searchBarHandler}
        searchBarOnClick={_searchBarOnClick}
      />
    </Container>
  );
}
