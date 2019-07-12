import React, { useState } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import ReportsBox from 'Components/ReportsBox';
import DataTable from 'Components/DataTable';
import { format } from 'date-fns';
import { COLORS } from 'Themes';
import Breadcrumbs from 'Components/Breadcrumbs';
import { history } from 'Config/Store';

export default function Expenses() {
  const [page, setPage] = useState(1);

  const reportsData = [
    {
      label: 'Hoje',
      value: 28.9,
      styles: {
        boxBackgroundColor: COLORS.expenses,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Atual',
      value: 29.9,
      styles: {
        boxBackgroundColor: COLORS.expenses,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Passado',
      value: 2400,
      styles: {
        boxBackgroundColor: COLORS.expenses,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    }
  ];

  const expenses = require('./data.json');

  const dataTableColumns = [
    { id: 'description', label: 'Descricão' },
    { id: 'date', label: 'Data', width: 250 },
    { id: 'value', label: 'Valor', width: 200 }
  ];

  const renderItem = (column, item) => {
    switch (column) {
      case 'date':
        return format(new Date(item[column]), "dd/MM/yyyy 'às' HH:mm");
      case 'value':
        return Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(item[column]);
      default:
        return item[column];
    }
  };

  return (
    <Container>
      <Breadcrumbs
        data={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Despesas' }
        ]}
      />

      <Title>Despesas</Title>
      <ReportsBox data={reportsData} />

      <Title>Extrato</Title>
      <DataTable
        renderItem={renderItem}
        columns={dataTableColumns}
        data={expenses.data}
        page={page}
        perPage={expenses.perPage}
        total={expenses.total}
        paginationOnChange={setPage}
        addButtonIsVisible={true}
        addButtonOnClick={() => history.push('/expenses/add')}
        searchBarIsVisible={true}
        fromIsVisible={true}
        toIsVisible={true}
      />
    </Container>
  );
}
