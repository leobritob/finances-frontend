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
  const [billingCyclesType, setBillingCyclesType] = useState('');
  const [billingCyclesTypes, setBillingCyclesTypes] = useState({
    total: 0,
    perPage: 20,
    page: 1,
    lastPage: 1,
    data: []
  });

  useEffect(() => {
    _getBillingCycleCategoryById(billingCycleCategoryId);
    _getAllBillingCyclesTypes();
  }, [billingCycleCategoryId]);

  async function _getBillingCycleCategoryById(id: number) {
    try {
      const response = await Services.billingCyclesCategories.getBillingCyclesCategoriesById(id);
      if (response.status === 200) {
        const { name, billingCyclesType } = response.data;

        setName(name);
        setBillingCyclesType({ label: billingCyclesType.name, value: billingCyclesType.id });
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
        billing_cycles_type_id: billingCyclesType.value,
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
        label="Tipo"
        placeholder="Selecione um tipo de faturamento"
        options={billingCyclesTypes}
        value={billingCyclesType}
        onChange={option => setBillingCyclesType(option)}
      />

      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <Button label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
