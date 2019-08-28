import React, { useState } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Services from 'Services';
import { toast } from 'react-toastify';
import Select from 'Components/Select';
import { history } from 'Config/Store';

const riskOptions = [{ label: 'Baixo', value: 1 }, { label: 'Moderado', value: 2 }, { label: 'Alto', value: 3 }];

export default function InvestmentsTypesAdd() {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [risk, setRisk] = useState(null);

  async function _save() {
    try {
      const response = await Services.investmentsTypes.storeInvestmentsTypes({
        name,
        description,
        risk
      });
      if (response.status === 200) {
        toast.success('Novo tipo de investimento cadastrado com sucesso');

        history.push('/investments-types');
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
          { label: 'Tipos de Investimentos', href: '/investments-types' },
          { label: 'Adicionar' }
        ]}
      />
      <Title>Novo Tipo de Investimento</Title>

      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        autoComplete="off"
      />
      <Select
        isSearchable
        label="Risco"
        placeholder="Selecione o risco do tipo do investimento"
        options={riskOptions}
        onChange={option => setRisk(option.value)}
      />
      <Button label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
