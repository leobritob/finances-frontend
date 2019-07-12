import React, { useState } from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import ReportsBox from 'Components/ReportsBox';
import DataTable from 'Components/DataTable';
import { format } from 'date-fns';
import { COLORS } from 'Themes';
import Breadcrumbs from 'Components/Breadcrumbs';

export default function Investment() {
  const data = [
    {
      label: 'Patrimônio Total',
      value: 26500,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Atual',
      value: 22000,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Passado',
      value: 19000,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    }
  ];

  const [page, setPage] = useState(1);
  const revenue = require('./data.json');

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
          { label: 'Investimentos' }
        ]}
      />
      <Title>Investimentos</Title>
      <ReportsBox data={data} />

      <Title>Extrato</Title>
      <DataTable
        addButton={true}
        addButtonOnClick={() => {}}
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
        searchBarIsVisible={true}
        fromIsVisible={true}
        toIsVisible={true}
      />
    </Container>
  );
}
