import React, { useState, useEffect } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import DataTable from 'Components/DataTable';
import { format } from 'date-fns';
import Breadcrumbs from 'Components/Breadcrumbs';
import { history } from 'Config/Store';
import Services from 'Services';
import { useDebounce } from 'use-debounce';
import Button from 'Components/Button';
import Colors from 'Themes/Colors';
import { toast } from 'react-toastify';

const fromDateValue = new Date(format(new Date(), 'yyyy-MM-01 00:00:00'));
const toDateValue = new Date(format(new Date(), 'yyyy-MM-dd 00:00:00'));

export default function InvestmentsTypes() {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [filter, setFilter] = useState({
    date__gte: fromDateValue,
    date__lte: toDateValue,
    billing_cycles_type_id: 3,
    search: ''
  });
  const [investmentsTypes, setInvestmentsTypes] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: []
  });
  const [filterDebounce] = useDebounce(filter, 300);

  useEffect(() => {
    _getAllInvestmentsTypes(filterDebounce);
  }, [filterDebounce]);

  function renderItem(column, item) {
    switch (column) {
      case 'date':
        return format(new Date(item[column]), 'dd/MM/yyyy');
      case 'value':
        return Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(item[column]);
      case '-':
        return (
          <Button
            styleButton="danger"
            onClick={() => _removeItem(item.id)}
            backgroundColor={Colors.expenses}
            height={25}
            icon="trash"
            iconColor="#ffffff"
            iconSize="xs"
            noMargin
            noBorder
          />
        );
      default:
        return item[column];
    }
  }

  async function _getAllInvestmentsTypes(params = {}) {
    try {
      const response = await Services.investmentsTypes.getAllInvestmentsTypes(params);
      if (response.status === 200) {
        setInvestmentsTypes(response.data);
      }
    } catch (e) {
      console.log('_getAllInvestmentsTypes/ERROR', e.message);
    }
  }

  async function _deleteInvestmentsTypesById(id) {
    try {
      if (!id) return false;

      const response = await Services.investmentsTypes.destroyInvestmentsTypes(id);
      if (response.status === 204) {
        toast.success('Tipo de Investimento removido com sucesso');

        _getAllInvestmentsTypes(filterDebounce);
      }
    } catch (e) {
      console.log('_deleteInvestmentsTypesById/ERROR', e.message);
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
      _deleteInvestmentsTypesById(id);
    }
  }

  function _handlePagination(page) {
    setFilter({ ...filter, page });
  }

  function _searchBarOnClick(search) {
    setFilter({ ...filter, search });
  }

  function _addButtonOnClick() {
    history.push('/investments-types/add');
  }

  function _itemOnClick(item) {
    history.push(`/investments-types/edit/${item.id}`);
  }

  return (
    <Container>
      <Breadcrumbs data={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Tipos de Investimentos' }]} />
      <Title>Tipos de Investimentos</Title>

      <DataTable
        itemOnClick={_itemOnClick}
        renderItem={renderItem}
        columns={[
          { id: 'name', label: 'Nome' },
          { id: 'description', label: 'Descrição' },
          { id: 'risk_label', label: 'Risco' },
          { id: 'company_fantasy_name', label: 'Risco' },
          { id: '-', label: '-', width: 80, noPadding: true }
        ]}
        data={investmentsTypes.data}
        page={investmentsTypes.page}
        perPage={investmentsTypes.perPage}
        total={investmentsTypes.total}
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
