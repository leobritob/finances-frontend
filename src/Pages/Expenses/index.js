import React from 'react';
import Title from 'Components/Title';
import { Container } from './styles';
import ReportsBox from 'Components/ReportsBox';
import DataTable from 'Components/DataTable';
import { format } from 'date-fns';

export default function Expenses() {
  const data = [
    {
      label: 'Hoje',
      value: 28.9,
      styles: {
        boxBackgroundColor: '#E66D67',
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Atual',
      value: 29.9,
      styles: {
        boxBackgroundColor: '#E66D67',
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Mês Passado',
      value: 2400,
      styles: {
        boxBackgroundColor: '#E66D67',
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    }
  ];

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
      <Title>Despesas</Title>
      <ReportsBox data={data} />

      <Title>Extrato</Title>
      <DataTable
        renderItem={renderItem}
        columns={[
          { id: 'description', label: 'Descricão' },
          { id: 'date', label: 'Data', width: 250 },
          { id: 'value', label: 'Valor', width: 200 }
        ]}
        data={[
          {
            description: 'Faculdade',
            date: '2019-07-02T09:00:00Z',
            value: 550
          },
          {
            description: 'Curso de Inglês',
            date: '2019-07-02T09:05:00Z',
            value: 400
          },
          {
            description: 'Academia',
            date: '2019-07-02T12:00:00Z',
            value: 90
          }
        ]}
      />
    </Container>
  );
}
