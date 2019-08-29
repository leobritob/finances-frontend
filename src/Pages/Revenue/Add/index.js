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

export default function RevenueAdd() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    _getAllBillingCyclesCategories();
  }, []);

  async function _getAllBillingCyclesCategories(params: Object = {}) {
    try {
      // Ciclo de pagamento do tipo receita
      params.billing_cycles_type_id = 1;

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
        billing_cycles_category_id: category,
        description,
        date,
        value
      });
      if (response.status === 200) {
        toast.success('Nova receita cadastrada com sucesso');

        history.push('/revenue');
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
          { label: 'Receitas', href: '/revenue' },
          { label: 'Adicionar' }
        ]}
      />
      <Title>Nova Receita</Title>

      <Select
        isSearchable
        label="Categoria"
        placeholder="Selecione uma categoria"
        options={categories}
        onChange={option => setCategory(option.value)}
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
