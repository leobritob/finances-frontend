import React, { useState, useEffect } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import DataTable from 'Components/DataTable';
import Breadcrumbs from 'Components/Breadcrumbs';
import { history } from 'Config/Store';
import Services from 'Services';
import { useDebounce } from 'use-debounce';
import Button from 'Components/Button';
import Colors from 'Themes/Colors';
import { toast } from 'react-toastify';

export default function Companies() {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [filter, setFilter] = useState({
    search: ''
  });
  const [filterDebounce] = useDebounce(filter, 300);
  const [companies, setCompanies] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: []
  });

  useEffect(() => {
    _getAllCompanies(filterDebounce);
  }, [filterDebounce]);

  function renderItem(column, item) {
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
  }

  async function _getAllCompanies(params = {}) {
    try {
      const response = await Services.companies.getAllCompanies(params);
      if (response.status === 200) {
        setCompanies(response.data);
      }
    } catch (e) {
      console.log('_getAllCompanies/ERROR', e.message);
    }
  }

  async function _deleteRow(id) {
    try {
      if (!id) return false;

      const response = await Services.companies.destroyCompanyById(id);
      if (response.status === 204) {
        toast.success('Empresa removida com sucesso');

        _getAllCompanies(filterDebounce);
      }
    } catch (e) {
      console.log('_deleteRow/ERROR', e.message);
    }
  }

  function _searchBarHandler(e) {
    const search = e.target.value;

    setSearchBarValue(search);
    setFilter({ ...filter, search });
  }

  function _removeItem(id) {
    const isDelete = window.confirm('Você tem certeza que deseja remover este item ?');
    if (isDelete) {
      _deleteRow(id);
    }
  }

  function _handlePagination(page) {
    setFilter({ ...filter, page });
  }

  function _searchBarOnClick(search) {
    setFilter({ ...filter, search });
  }

  function _addButtonOnClick() {
    history.push('/companies/add');
  }

  function _itemOnClick(item) {
    history.push(`/companies/edit/${item.id}`);
  }

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
          { id: '-', label: '-', width: 80, noPadding: true }
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
