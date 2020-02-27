import React, { useState, useEffect } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import ReportsBox from 'Components/ReportsBox';
import DataTable from 'Components/DataTable';
import { format } from 'date-fns';
import { COLORS } from 'Themes';
import Breadcrumbs from 'Components/Breadcrumbs';
import Services from 'Services';
import { useDebounce } from 'use-debounce';
import Button from 'Components/Button';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const fromDateValue = new Date(format(new Date(), 'yyyy-MM-01 00:00:00'));
const toDateValue = new Date(format(new Date(), 'yyyy-MM-dd 00:00:00'));

export default function Revenue() {
  const history = useHistory();
  const [searchBarValue, setSearchBarValue] = useState('');
  const [fromDate, setFromDate] = useState(fromDateValue);
  const [toDate, setToDate] = useState(toDateValue);
  const [filter, setFilter] = useState({
    date__gte: fromDateValue,
    date__lte: toDateValue,
    billing_cycles_type_id: 1,
    search: '',
  });
  const [revenue, setRevenue] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: [],
  });
  const [reports, setReports] = useState({
    today: 0,
    current_month: 0,
    last_month: 0,
  });

  const [filterDebounce] = useDebounce(filter, 300);

  useEffect(() => {
    _getAllRevenues(filterDebounce);
    _getRevenuesReports(filterDebounce);
  }, [filterDebounce]);

  function renderItem(column, item) {
    switch (column) {
      case 'date':
        return format(new Date(item[column]), 'dd/MM/yyyy');
      case 'value':
        return Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(item[column]);
      case '-':
        return (
          <Button
            styleButton="danger"
            onClick={() => _removeItem(item.id)}
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

  async function _getAllRevenues(params = {}) {
    try {
      const response = await Services.billingCycles.getAllBillingCycles(params);
      if (response.status === 200) {
        setRevenue(response.data);
      }
    } catch (e) {
      console.log('_getAllRevenues/ERROR', e.message);
    }
  }

  async function _getRevenuesReports(params = {}) {
    try {
      const response = await Services.billingCycles.getBillingCyclesReports(
        params
      );
      if (response.status === 200) {
        setReports(response.data);
      }
    } catch (e) {
      console.log('_getRevenuesReports/ERROR', e.message);
    }
  }

  async function _deleteRevenue(id) {
    try {
      if (!id) return false;

      const response = await Services.billingCycles.destroyBillingCycles(id);
      if (response.status === 204) {
        toast.success('Receita removida com sucesso');

        _getAllRevenues(filterDebounce);
        _getRevenuesReports(filterDebounce);
      }
    } catch (e) {
      console.log('_deleteRevenue/ERROR', e.message);
    }
  }

  function _searchBarHandler(e) {
    const search = e.target.value;

    setSearchBarValue(search);
    setFilter({ ...filter, search });
  }

  function _fromHandler(from) {
    setFromDate(from);
    from = format(new Date(from), 'yyyy-MM-dd');

    setFilter({ ...filter, date__gte: from });
  }

  function _toHandler(to) {
    setToDate(to);
    to = format(new Date(to), 'yyyy-MM-dd');

    setFilter({ ...filter, date__lte: to });
  }

  function _removeItem(id) {
    const isDelete = window.confirm(
      'Você tem certeza que deseja remover este item ?'
    );
    if (isDelete) {
      _deleteRevenue(id);
    }
  }

  function _handlePagination(page) {
    setFilter({ ...filter, page });
  }

  function _searchBarOnClick(search) {
    setFilter({ ...filter, search });
  }

  function _addButtonOnClick() {
    history.push('/revenue/add');
  }

  function _itemOnClick(item) {
    history.push(`/revenue/edit/${item.id}/`);
  }

  return (
    <Container>
      <Breadcrumbs
        data={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Receitas' },
        ]}
      />
      <Title>Receitas</Title>
      <ReportsBox
        data={[
          {
            label: 'Hoje',
            value: reports.today ? reports.today : 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: '#ffffff',
              labelTextColor: '#ffffff',
            },
          },
          {
            label: 'Mês Atual',
            value: reports.current_month ? reports.current_month : 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: '#ffffff',
              labelTextColor: '#ffffff',
            },
          },
          {
            label: 'Mês Passado',
            value: reports.last_month ? reports.last_month : 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: '#ffffff',
              labelTextColor: '#ffffff',
            },
          },
        ]}
      />

      <Title>Extrato</Title>
      <DataTable
        itemOnClick={_itemOnClick}
        renderItem={renderItem}
        columns={[
          { id: 'description', label: 'Descricão' },
          { id: 'date', label: 'Data', width: 100 },
          { id: 'value', label: 'Valor', width: 200 },
          {
            id: 'billing_cycles_category_name',
            label: 'Categoria',
            width: 250,
          },
          { id: 'company_fantasy_name', label: 'Empresa', width: 250 },
          { id: '-', label: '-', width: 80, noPadding: true },
        ]}
        data={revenue.data}
        page={revenue.page}
        perPage={revenue.perPage}
        total={revenue.total}
        paginationOnChange={_handlePagination}
        addButtonIsVisible={true}
        addButtonOnClick={_addButtonOnClick}
        searchBarIsVisible={true}
        searchBarValue={searchBarValue}
        searchBarOnChange={_searchBarHandler}
        searchBarOnClick={_searchBarOnClick}
        fromIsVisible={true}
        fromOnChange={_fromHandler}
        fromValue={fromDate}
        toIsVisible={true}
        toOnChange={_toHandler}
        toValue={toDate}
      />
    </Container>
  );
}
