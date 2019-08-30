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

export default function BillingCyclesTypes() {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [filter, setFilter] = useState({
    search: ''
  });
  const [billingCyclesTypes, setBillingCyclesType] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: []
  });

  const [filterDebounce] = useDebounce(filter, 300);

  useEffect(() => {
    _getAllBillingCyclesTypes(filterDebounce);
  }, [filterDebounce]);

  function renderItem(column, item) {
    switch (column) {
      case '-':
        return (
          <Button
            onClick={() => _removeItem(item.id)}
            backgroundColor={Colors.expenses}
            height={25}
            icon="trash"
            iconSize="xs"
            noMargin
          />
        );
      default:
        return item[column];
    }
  }

  async function _getAllBillingCyclesTypes(params = {}) {
    try {
      const response = await Services.billingCyclesTypes.getAllBillingCyclesTypes(params);
      if (response.status === 200) {
        setBillingCyclesType(response.data);
      }
    } catch (e) {
      console.log('_getAllBillingCyclesTypes/ERROR', e.message);
    }
  }

  async function _deleteBillingCyclesType(id) {
    try {
      if (typeof id === 'undefined' || !id) return false;

      const response = await Services.billingCyclesTypes.destroyBillingCyclesTypes(id);
      if (response.status === 204) {
        toast.success('Tipo removido com sucesso');

        _getAllBillingCyclesTypes(filterDebounce);
      }
    } catch (e) {
      console.log('_deleteBillingCyclesType/ERROR', e.message);
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
      _deleteBillingCyclesType(id);
    }
  }

  function _handlePagination(page) {
    setFilter({ ...filter, page });
  }

  function _searchBarOnClick(search) {
    setFilter({ ...filter, search });
  }

  function _addButtonOnClick() {
    history.push('/billing-cycles-types/add');
  }

  function _itemOnClick(item) {
    history.push(`/billing-cycles-types/edit/${item.id}`);
  }

  return (
    <Container>
      <Breadcrumbs data={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Tipos de Faturamento' }]} />
      <Title>Tipos de Faturamento</Title>

      <DataTable
        itemOnClick={_itemOnClick}
        renderItem={renderItem}
        columns={[
          { id: 'name', label: 'Nome' },
          { id: 'description', label: 'Descrição', width: 200 },
          { id: '-', label: '-', width: 80, noPadding: true }
        ]}
        data={billingCyclesTypes.data}
        page={billingCyclesTypes.page}
        perPage={billingCyclesTypes.perPage}
        total={billingCyclesTypes.total}
        paginationOnChange={_handlePagination}
        addButtonIsVisible={true}
        addButtonOnClick={_addButtonOnClick}
        searchBarIsVisible={true}
        searchBarValue={searchBarValue}
        searchBarOnChange={_searchBarHandler}
        searchBarOnClick={_searchBarOnClick}
      />
    </Container>
  );
}
