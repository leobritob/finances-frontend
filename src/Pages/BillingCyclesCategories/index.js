import React, { useState, useEffect } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import DataTable from 'Components/DataTable';
import Breadcrumbs from 'Components/Breadcrumbs';
import Services from 'Services';
import { useDebounce } from 'use-debounce';
import Button from 'Components/Button';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function BillingCyclesCategories() {
  const history = useHistory();
  const [searchBarValue, setSearchBarValue] = useState('');
  const [filter, setFilter] = useState({
    search: '',
  });
  const [billingCyclesCategories, setBillingCyclesCategories] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: [],
  });

  const [filterDebounce] = useDebounce(filter, 300);

  useEffect(() => {
    _getAllBillingCyclesCategories(filterDebounce);
  }, [filterDebounce]);

  function renderItem(column, item) {
    switch (column) {
      case '-':
        return (
          <Button
            styleButton="danger"
            onClick={() => _removeItem(item.id)}
            height={25}
            icon="trash"
            iconColor="#ffffff"
            iconSize="xs"
            noMargin
          />
        );
      default:
        return item[column];
    }
  }

  async function _getAllBillingCyclesCategories(params = {}) {
    try {
      const response = await Services.billingCyclesCategories.getAllBillingCyclesCategories(params);
      if (response.status === 200) {
        setBillingCyclesCategories(response.data);
      }
    } catch (e) {
      console.log('_getAllBillingCyclesCategories/ERROR', e.message);
    }
  }

  async function _deleteBillingCyclesCategory(id) {
    try {
      if (typeof id === 'undefined' || !id) return false;

      const response = await Services.billingCyclesCategories.destroyBillingCyclesCategories(id);
      if (response.status === 204) {
        toast.success('Categoria removida com sucesso');

        _getAllBillingCyclesCategories(filterDebounce);
      }
    } catch (e) {
      console.log('_deleteBillingCyclesCategory/ERROR', e.message);
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
      _deleteBillingCyclesCategory(id);
    }
  }

  function _handlePagination(page) {
    setFilter({ ...filter, page });
  }

  function _searchBarOnClick(search) {
    setFilter({ ...filter, search });
  }

  function _addButtonOnClick() {
    history.push('/billing-cycles-categories/add');
  }

  function _itemOnClick(item) {
    history.push(`/billing-cycles-categories/edit/${item.id}`);
  }

  return (
    <Container>
      <Breadcrumbs data={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Categorias de Faturamento' }]} />
      <Title>Categorias de Faturamento</Title>

      <DataTable
        itemOnClick={_itemOnClick}
        renderItem={renderItem}
        columns={[
          { id: 'name', label: 'Descrição' },
          { id: 'billing_cycles_type_name', label: 'Tipo', width: 200 },
          { id: 'company_fantasy_name', label: 'Empresa', width: 350 },
          { id: '-', label: '-', width: 80, noPadding: true },
        ]}
        data={billingCyclesCategories.data}
        page={billingCyclesCategories.page}
        perPage={billingCyclesCategories.perPage}
        total={billingCyclesCategories.total}
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
