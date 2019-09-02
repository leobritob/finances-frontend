import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Services from 'Services';
import { toast } from 'react-toastify';
import Select from 'Components/Select';
import { history } from 'Config/Store';

export default function BillingCyclesCategoriesEdit({ match }) {
  const billingCycleCategoryId = Number(match.params.id);
  const [name, setName] = useState('');
  const [billing_cycles_type_id, setBillingCyclesTypeId] = useState('');
  const [billingCyclesTypes, setBillingCyclesTypes] = useState({
    total: 0,
    perPage: 20,
    page: 1,
    lastPage: 1,
    data: []
  });
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompanyId] = useState('');

  useEffect(() => {
    _getBillingCycleCategoryById(billingCycleCategoryId);
    _getAllBillingCyclesTypes();
    _getAllCompanies();
  }, [billingCycleCategoryId]);

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

  async function _getBillingCycleCategoryById(id: number) {
    try {
      const response = await Services.billingCyclesCategories.getBillingCyclesCategoriesById(id);
      if (response.status === 200) {
        const {
          name,
          company_id,
          company_fantasy_name,
          billing_cycles_type_name,
          billing_cycles_type_id
        } = response.data;

        setName(name);
        setCompanyId({ label: company_fantasy_name, value: company_id });
        setBillingCyclesTypeId({ label: billing_cycles_type_name, value: billing_cycles_type_id });
      }
    } catch (e) {
      console.log('_getBillingCycleCategoryById/ERROR', e.message);
    }
  }

  async function _getAllBillingCyclesTypes(params: Object = {}) {
    try {
      const response = await Services.billingCyclesTypes.getAllBillingCyclesTypes(params);
      if (response.status === 200) {
        setBillingCyclesTypes(response.data.data.map(item => ({ label: item.name, value: item.id })));
      }
    } catch (e) {
      console.log('_getAllBillingCyclesTypes/ERROR', e.message);
    }
  }

  async function _save() {
    try {
      const response = await Services.billingCyclesCategories.updateBillingCyclesCategories(billingCycleCategoryId, {
        company_id: company_id.value,
        billing_cycles_type_id: billing_cycles_type_id.value,
        name
      });
      if (response.status === 200) {
        toast.success('Categoria de faturamento atualizada com sucesso');

        history.push('/billing-cycles-categories');
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
          {
            label: 'Categorias de Faturamento',
            href: '/billing-cycles-categories'
          },
          { label: 'Alterar' }
        ]}
      />
      <Title>Alterar Categoria de Faturamento</Title>

      <Select
        isSearchable
        label="Empresa"
        placeholder="Selecione uma empresa"
        options={companies}
        value={company_id}
        onChange={option => setCompanyId(option)}
      />
      <Select
        isSearchable
        label="Tipo"
        placeholder="Selecione um tipo de faturamento"
        options={billingCyclesTypes}
        value={billing_cycles_type_id}
        onChange={option => setBillingCyclesTypeId(option)}
      />

      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <Button label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
