import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Services from 'Services';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function BillingCyclesTypesEdit({ match }) {
  const history = useHistory();
  const billingCyclesTypeId = Number(match.params.id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    _getBillingCyclesTypeById(billingCyclesTypeId);
  }, [billingCyclesTypeId]);

  async function _getBillingCyclesTypeById(id: number) {
    try {
      const response = await Services.billingCyclesTypes.getBillingCyclesTypesById(id);
      if (response.status === 200) {
        const { name, description } = response.data;
        setName(name);
        setDescription(description);
      }
    } catch (e) {
      console.error('_getBillingCyclesTypeById/ERROR', e.message);
    }
  }

  async function _save() {
    try {
      const response = await Services.billingCyclesTypes.updateBillingCyclesTypes(billingCyclesTypeId, {
        name,
        description,
      });
      if (response.status === 200) {
        toast.success('Tipo de faturamento atualizado com sucesso');

        history.push('/billing-cycles-types');
      }
    } catch (e) {
      console.error('_save/ERROR', e.message);
    }
  }

  return (
    <Container>
      <Breadcrumbs
        data={[
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Tipo de Faturamento',
            href: '/billing-cycles-types',
          },
          { label: 'Adicionar' },
        ]}
      />
      <Title>Novo Tipo de Faturamento</Title>
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        autoComplete="off"
      />
      <Button styleButton="primary" label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
