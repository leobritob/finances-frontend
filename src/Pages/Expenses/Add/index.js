import React, { useState } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import NumberFormat from 'Components/NumberFormat';
import Button from 'Components/Button';
import DatePicker from 'Components/DatePicker';

export default function ExpensesAdd() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
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
      <DatePicker selected={date} onChange={setDate} />
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
        icon="check"
        allowSpinnerLoading={true}
        onClick={() => alert(JSON.stringify({ description, date, amount }))}
      />
    </Container>
  );
}
