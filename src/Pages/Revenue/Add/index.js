import React from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';

export default function RevenueAdd() {
  return (
    <Container>
      <Breadcrumbs
        data={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Receitas', href: '/revenue' },
          { label: 'Adicionar' }
        ]}
      />
      <Title>Nova Receita</Title>

      <Input placeholder="Descricão" autoComplete="off" />
      <Input type="date" placeholder="Data" />
      <Input type="number" placeholder="Valor" />
      <Button label="Salvar" />
    </Container>
  );
}
