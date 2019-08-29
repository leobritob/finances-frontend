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

const riskOptions = [{ label: 'Baixo', value: 1 }, { label: 'Moderado', value: 2 }, { label: 'Alto', value: 3 }];

export default function InvestmentsTypesEdit({ match }) {
  const investmentTypeId = Number(match.params.id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [risk, setRisk] = useState('');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    _getInvestmentTypeById(investmentTypeId);
  }, [investmentTypeId]);

  async function _getInvestmentTypeById(id) {
    try {
      const response = await Services.investmentsTypes.getInvestmentsTypesById(id);
      if (response.status === 200) {
        const { name, description, color, risk, risk_label } = response.data;
        setName(name);
        setDescription(description);
        setColor(color);
        setRisk({ label: risk_label, value: risk });
      }
    } catch (e) {
      console.error('_getInvestmentTypeById/ERROR', e.message);
    }
  }

  async function _save() {
    try {
      const response = await Services.investmentsTypes.updateInvestmentsTypes(investmentTypeId, {
        name,
        description,
        color,
        risk: risk.value
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
          { label: 'Alterar' }
        ]}
      />
      <Title>Alterar Tipo de Investimento</Title>

      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        autoComplete="off"
      />
      <Input value={color} onChange={e => setColor(e.target.value)} placeholder="Cor" autoComplete="off" />
      <Select
        isSearchable
        label="Risco"
        placeholder="Selecione o risco do tipo do investimento"
        options={riskOptions}
        value={risk}
        onChange={option => setRisk(option)}
      />
      <Button label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
