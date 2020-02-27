import React, { useState } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Services from 'Services';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function BillingCyclesTypesAdd() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function _save() {
    try {
      const response = await Services.billingCyclesTypes.storeBillingCyclesTypes({ name, description });
      if ([200, 201].includes(response.status)) {
        toast.success('Novo tipo de faturamento cadastrado com sucesso');

        history.push('/billing-cycles-types');
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
