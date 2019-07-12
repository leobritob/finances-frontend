import React, { useState } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import ReportsBox from 'Components/ReportsBox';
import DataTable from 'Components/DataTable';
import { format } from 'date-fns';
import { COLORS } from 'Themes';
import Breadcrumbs from 'Components/Breadcrumbs';
import { history } from 'Config/Store';

function Revenue() {
  const data = [
    {
      label: 'Hoje',
      value: 0,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Atual',
      value: 10000,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Passado',
      value: 17000,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    }
  ];

  const [page, setPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState('');
  const revenue = require('./revenue.json');

  const renderItem = (column, item) => {
    switch (column) {
      case 'date':
        return format(item[column], 'DD/MM/YYYY [às] HH:mm');
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
          { label: 'Receitas' }
        ]}
      />
      <Title>Receitas</Title>
      <ReportsBox data={data} />

      <Title>Extrato</Title>
      <DataTable
        renderItem={renderItem}
        columns={[
          { id: 'description', label: 'Descricão' },
          { id: 'date', label: 'Data', width: 250 },
          { id: 'value', label: 'Valor', width: 200 }
        ]}
        data={revenue.data}
        page={page}
        perPage={revenue.perPage}
        total={revenue.total}
        paginationOnChange={setPage}
        addButtonIsVisible={true}
        addButtonOnClick={() => history.push('/revenue/add')}
        searchBarIsVisible={true}
        searchBarValue={searchBarValue}
        searchBarOnChange={e => setSearchBarValue(e.target.value)}
        searchBarOnClick={search => {}}
        fromIsVisible={true}
        toIsVisible={true}
      />
    </Container>
  );
}

export default Revenue;
