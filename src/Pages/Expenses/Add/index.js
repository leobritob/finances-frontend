//@flow
import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import TextArea from 'Components/TextArea';
import NumberFormat from 'Components/NumberFormat';
import Button from 'Components/Button';
import DatePicker from 'Components/DatePicker';
import Services from 'Services';
import { toast } from 'react-toastify';
import Select from 'Components/Select';
import { history } from 'Config/Store';

export default function ExpensesAdd() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [billing_cycles_category_id, setBillingCyclesCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompanyId] = useState('');

  useEffect(() => {
    _getAllCompanies();
  }, []);

  useEffect(() => {
    _getAllBillingCyclesCategories({ company_id });
  }, [company_id]);

  async function _getAllCompanies(params: Object = {}) {
    try {
      params.perPage = 'total';

      const response = await Services.companies.getAllCompanies(params);
      if (response.status === 200) {
        setCompanies(
          response.data.map(company => ({
            label: company.fantasy_name,
            value: company.id,
          }))
        );
      }
    } catch (e) {
      console.log('_getAllCompanies/ERROR', e.message);
    }
  }

  async function _getAllBillingCyclesCategories(params: Object = {}) {
    try {
      if (!params.company_id) return false;

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
        company_id,
        billing_cycles_category_id,
        description,
        date,
        value,
      });
      if ([200, 201].includes(response.status)) {
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
          { label: 'Adicionar' },
        ]}
      />
      <Title>Nova Despesa</Title>

      <Select
        isSearchable
        label="Empresa"
        placeholder="Selecione uma empresa"
        options={companies}
        onChange={option => setCompanyId(option.value)}
      />

      <Select
        isSearchable
        label="Categoria"
        placeholder="Selecione uma categoria"
        options={categories}
        onChange={option => setBillingCyclesCategoryId(option.value)}
      />

      <TextArea
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
      <Button styleButton="primary" label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
