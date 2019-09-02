import React, { useState, useEffect } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import ReportsBox from 'Components/ReportsBox';
import DataTable from 'Components/DataTable';
import { format } from 'date-fns';
import { COLORS } from 'Themes';
import Breadcrumbs from 'Components/Breadcrumbs';
import { history } from 'Config/Store';
import Services from 'Services';
import { useDebounce } from 'use-debounce';
import Button from 'Components/Button';
import Colors from 'Themes/Colors';
import { toast } from 'react-toastify';

const fromDateValue = new Date(format(new Date(), 'yyyy-MM-01 00:00:00'));
const toDateValue = new Date(format(new Date(), 'yyyy-MM-dd 00:00:00'));

export default function Investments() {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [fromDate, setFromDate] = useState(fromDateValue);
  const [toDate, setToDate] = useState(toDateValue);
  const [filter, setFilter] = useState({
    date__gte: fromDateValue,
    date__lte: toDateValue,
    search: ''
  });
  const [investments, setInvestments] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: []
  });
  const [reports, setReports] = useState({
    today: 0,
    current_month: 0,
    last_month: 0
  });

  const [filterDebounce] = useDebounce(filter, 300);

  useEffect(() => {
    _getAllInvestments(filterDebounce);
  }, [filterDebounce]);

  useEffect(() => {
    _getInvestmentsReports();
  }, []);

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

  async function _getAllInvestments(params = {}) {
    try {
      const response = await Services.investments.getAllInvestments(params);
      if (response.status === 200) {
        setInvestments(response.data);
      }
    } catch (e) {
      console.log('_getAllInvestments/ERROR', e.message);
    }
  }

  async function _getInvestmentsReports(params = {}) {
    try {
      const response = await Services.investments.getInvestmentsReports(params);
      if (response.status === 200) {
        setReports(response.data);
      }
    } catch (e) {
      console.log('_getInvestmentsReports/ERROR', e.message);
    }
  }

  async function _deleteInvestments(id) {
    try {
      if (!id) return false;

      const response = await Services.investments.destroyInvestments(id);
      if (response.status === 204) {
        toast.success('Investimento removido com sucesso');

        _getAllInvestments(filterDebounce);
        _getInvestmentsReports(filterDebounce);
      }
    } catch (e) {
      console.log('_deleteInvestments/ERROR', e.message);
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
    const isDelete = window.confirm('Você tem certeza que deseja remover este item ?');
    if (isDelete) {
      _deleteInvestments(id);
    }
  }

  function _handlePagination(page) {
    setFilter({ ...filter, page });
  }

  function _searchBarOnClick(search) {
    setFilter({ ...filter, search });
  }

  function _addButtonOnClick() {
    history.push('/investments/add');
  }

  function _itemOnClick(item) {
    history.push(`/investments/edit/${item.id}`);
  }

  return (
    <Container>
      <Breadcrumbs data={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Investimentos' }]} />
      <Title>Investimentos</Title>

      <ReportsBox
        data={[
          {
            label: 'Hoje',
            value: reports.today ? reports.today : 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: '#ffffff',
              labelTextColor: '#ffffff'
            }
          },
          {
            label: 'Mês Atual',
            value: reports.current_month ? reports.current_month : 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: '#ffffff',
              labelTextColor: '#ffffff'
            }
          },
          {
            label: 'Mês Passado',
            value: reports.last_month ? reports.last_month : 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: '#ffffff',
              labelTextColor: '#ffffff'
            }
          }
        ]}
      />

      <Title>Extrato</Title>
      <DataTable
        itemOnClick={_itemOnClick}
        renderItem={renderItem}
        columns={[
          { id: 'name', label: 'Nome' },
          { id: 'investments_type_name', label: 'Tipo' },
          { id: 'date', label: 'Data', width: 100 },
          { id: 'value', label: 'Valor', width: 200 },
          { id: 'company_fantasy_name', label: 'Empresa', width: 250 },
          { id: '-', label: '-', width: 80, noPadding: true }
        ]}
        data={investments.data}
        page={investments.page}
        perPage={investments.perPage}
        total={investments.total}
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
