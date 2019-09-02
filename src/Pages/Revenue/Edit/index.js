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

export default function RevenueEdit({ match }) {
  const billingCycleId = Number(match.params.id);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompanyId] = useState('');

  useEffect(() => {
    _getBillingCyclesById(billingCycleId);
    _getAllBillingCyclesCategories();
    _getAllCompanies();
  }, [billingCycleId]);

  async function _getAllCompanies(params: Object = {}) {
    try {
      params.perPage = 'total';

      const response = await Services.companies.getAllCompanies(params);
      if (response.status === 200) {
        setCompanies(response.data.map(company => ({ label: company.fantasy_name, value: company.id })));
      }
    } catch (e) {
      console.log('_getAllCompanies/ERROR', e.message);
    }
  }

  async function _getBillingCyclesById(id: number) {
    try {
      const response = await Services.billingCycles.getBillingCyclesById(id);
      if (response.status === 200) {
        const {
          description,
          date,
          value,
          company_id,
          company_fantasy_name,
          billing_cycles_category_id,
          billing_cycles_category_name
        } = response.data;

        setDescription(description);
        setDate(new Date(date));
        setValue(value);
        setCompanyId({ label: company_fantasy_name, value: company_id });
        setCategory({ label: billing_cycles_category_name, value: billing_cycles_category_id });
      }
    } catch (e) {
      console.error('_getBillingCycleById/ERROR', e.message);
    }
  }

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
      const response = await Services.billingCycles.updateBillingCycles(billingCycleId, {
        company_id,
        billing_cycles_category_id: category.value,
        description,
        date,
        value
      });
      if (response.status === 200) {
        toast.success('Receita atualizada com sucesso');

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
          { label: 'Alterar' }
        ]}
      />
      <Title>Alterar Receita</Title>

      <Select
        isSearchable
        label="Empresa"
        placeholder="Selecione uma empresa"
        options={companies}
        value={company_id}
        onChange={option => setCompanyId(option.value)}
      />

      <Select
        isSearchable
        label="Categoria"
        placeholder="Selecione uma categoria"
        value={category}
        options={categories}
        onChange={option => setCategory(option)}
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
