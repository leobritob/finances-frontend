import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Services from 'Services';
import { toast } from 'react-toastify';
import Select from 'Components/Select';
import InputColor from 'Components/InputColor';
import { useHistory } from 'react-router-dom';

const riskOptions = [
  { label: 'Baixo', value: 1 },
  { label: 'Moderado', value: 2 },
  { label: 'Alto', value: 3 },
];

export default function InvestmentsTypesEdit({ match }) {
  const history = useHistory();
  const investmentTypeId = Number(match.params.id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [risk, setRisk] = useState('');
  const [color, setColor] = useState('#000000');
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompanyId] = useState('');

  useEffect(() => {
    _getInvestmentTypeById(investmentTypeId);
    _getAllCompanies();
  }, [investmentTypeId]);

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

  async function _getInvestmentTypeById(id) {
    try {
      const response = await Services.investmentsTypes.getInvestmentsTypesById(id);
      if (response.status === 200) {
        const { company_fantasy_name, company_id, name, description, color, risk, risk_label } = response.data;
        setCompanyId({ label: company_fantasy_name, value: company_id });
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
        company_id: company_id.value,
        name,
        description,
        color,
        risk: risk.value,
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
          { label: 'Alterar' },
        ]}
      />
      <Title>Alterar Tipo de Investimento</Title>

      <Select
        isSearchable
        label="Empresa"
        placeholder="Selecione uma empresa"
        options={companies}
        value={company_id}
        onChange={option => setCompanyId(option)}
      />
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        autoComplete="off"
      />
      <InputColor value={color} onChange={color => setColor(color.hex)} />
      <Select
        isSearchable
        label="Risco"
        placeholder="Selecione o risco do tipo do investimento"
        options={riskOptions}
        value={risk}
        onChange={option => setRisk(option)}
      />
      <Button styleButton="primary" label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
