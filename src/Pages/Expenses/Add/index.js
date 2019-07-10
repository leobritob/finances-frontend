import React, { useState } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import NumberFormat from 'Components/NumberFormat';
import Button from 'Components/Button';

export default function ExpensesAdd() {
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(0);

  return (
    <Container>
      <Breadcrumbs
        data={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Despesas', href: '/expenses' },
          { label: 'Adicionar' }
        ]}
      />
      <Title>Nova Despesa</Title>

      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descricão"
        autoComplete="off"
      />
      <Input
        value={date}
        onChange={e => setDate(e.target.value)}
        type="date"
        placeholder="Data"
      />
      <NumberFormat
        value={amount}
        onChange={e => setAmount(e.target.value)}
        decimalScale={2}
        decimalSeparator=","
        thousandSeparator="."
        placeholder="Valor"
      />
      <Button
        label="Salvar"
        onClick={() => alert(JSON.stringify({ description, date, amount }))}
      />
    </Container>
  );
}
