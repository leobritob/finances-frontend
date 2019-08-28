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

export default function ExpenseAdd() {
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [value, setValue] = useState(null);
  const [billing_cycles_category_id, setBillingCyclesCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    _getAllBillingCyclesCategories();
  }, []);

  async function _getAllBillingCyclesCategories(params: Object = {}) {
    try {
      // Ciclo de pagamento do tipo despesa
      params.billing_cycles_type_id = 2;

      const response = await Services.billingCyclesCategories.getAllBillingCyclesCategories(params);
      if (response.status === 200) {
        setCategories(response.data.data.map(item => ({ label: item.name, value: item.id })));
      }
    } catch (e) {
      console.log('_getAllBillingCyclesCategories/ERROR', e.message);
    }
  }

  async function _save() {
    try {
      const response = await Services.billingCycles.storeBillingCycles({
        billing_cycles_category_id,
        description,
        date,
        value
      });
      if (response.status === 200) {
        toast.success('Nova despesa cadastrada com sucesso');

        history.push('/expenses');
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
          { label: 'Despesas', href: '/expenses' },
          { label: 'Adicionar' }
        ]}
      />
      <Title>Nova Despesa</Title>

      <Select
        isSearchable
        label="Categoria"
        placeholder="Selecione uma categoria"
        options={categories}
        onChange={option => setBillingCyclesCategoryId(option.value)}
      />

      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descricão"
        autoComplete="off"
      />
      <DatePicker placeholderText="Data" selected={date} onChange={date => setDate(date)} />
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
      <Button label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
