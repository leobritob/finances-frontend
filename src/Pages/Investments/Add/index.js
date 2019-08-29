import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import NumberFormat from 'Components/NumberFormat';
import Button from 'Components/Button';
import DatePicker from 'Components/DatePicker';
import Services from 'Services';
import { toast } from 'react-toastify';
import Select from 'Components/Select';
import { history } from 'Config/Store';

export default function InvestmentsAdd() {
  const [investmentTypes, setInvestmentTypes] = useState({
    total: 0,
    page: 1,
    perPage: 20,
    lastPage: 0,
    data: []
  });
  const [investments_type_id, setInvestmentTypeId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [due_date, setDueDate] = useState('');

  useEffect(() => {
    _getAllInvestmentsTypes();
  }, []);

  async function _getAllInvestmentsTypes(params: Object = {}) {
    try {
      const response = await Services.investmentsTypes.getAllInvestmentsTypes(params);
      if (response.status === 200) {
        setInvestmentTypes(response.data.data.map(item => ({ label: item.name, value: item.id })));
      }
    } catch (e) {
      console.log('_getAllInvestmentsTypes/ERROR', e.message);
    }
  }

  async function _save() {
    try {
      const response = await Services.investments.storeInvestments({
        investments_type_id,
        name,
        description,
        value,
        date,
        due_date
      });
      if (response.status === 200) {
        toast.success('Novo investimento cadastrado com sucesso');

        history.push('/investments');
      }
    } catch (e) {
      console.log('_save/ERROR', e.message);
    }
  }

  return (
    <Container>
      <Breadcrumbs
        data={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Investimentos', href: '/investments' },
          { label: 'Adicionar' }
        ]}
      />
      <Title>Novo Investimento</Title>

      <Select
        isSearchable
        label="Tipo de Investimento"
        placeholder="Selecione o tipo do investimento"
        options={investmentTypes}
        onChange={option => setInvestmentTypeId(option.value)}
      />
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        autoComplete="off"
      />
      <NumberFormat
        type="tel"
        value={value}
        onChange={e => setValue(e.target.value)}
        fixedDecimalScale
        decimalScale={2}
        decimalSeparator="."
        thousandSeparator=""
        placeholder="Valor (R$)"
      />
      <DatePicker placeholderText="Data de compra" selected={date} onChange={date => setDate(date)} />
      <DatePicker placeholderText="Data  de vencimento" selected={due_date} onChange={date => setDueDate(date)} />
      <Button label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
