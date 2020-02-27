//@flow
import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import TextArea from 'Components/TextArea';
import NumberFormat from 'Components/NumberFormat';
import Button from 'Components/Button';
import DatePicker from 'Components/DatePicker';
import Services from 'Services';
import { toast } from 'react-toastify';
import Select from 'Components/Select';
import { useHistory } from 'react-router-dom';

export default function InvestmentsAdd() {
  const history = useHistory();
  const [investmentTypes, setInvestmentTypes] = useState([]);
  const [investments_type_id, setInvestmentTypeId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [due_date, setDueDate] = useState('');
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompanyId] = useState('');

  useEffect(() => {
    _getAllCompanies();
  }, []);

  useEffect(() => {
    _getAllInvestmentsTypes({ company_id });
  }, [company_id]);

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

  async function _getAllInvestmentsTypes(params: Object = {}) {
    try {
      if (!params.company_id) return false;

      params.perPage = 'total';

      const response = await Services.investmentsTypes.getAllInvestmentsTypes(params);
      if (response.status === 200) {
        setInvestmentTypes(response.data.map(item => ({ label: item.name, value: item.id })));
      }
    } catch (e) {
      console.log('_getAllInvestmentsTypes/ERROR', e.message);
    }
  }

  async function _save() {
    try {
      const response = await Services.investments.storeInvestments({
        company_id,
        investments_type_id,
        name,
        description,
        value,
        date,
        due_date,
      });
      if ([200, 201].includes(response.status)) {
        toast.success('Novo investimento cadastrado com sucesso');

        history.push('/investments');
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
          { label: 'Investimentos', href: '/investments' },
          { label: 'Adicionar' },
        ]}
      />
      <Title>Novo Investimento</Title>

      <Select
        isSearchable
        label="Empresa"
        placeholder="Selecione uma empresa"
        options={companies}
        onChange={option => setCompanyId(option.value)}
      />

      <Select
        isSearchable
        label="Tipo de Investimento"
        placeholder="Selecione o tipo do investimento"
        options={investmentTypes}
        onChange={option => setInvestmentTypeId(option.value)}
      />
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" autoComplete="off" />
      <TextArea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        autoComplete="off"
      />
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
      <DatePicker placeholderText="Data de compra" selected={date} onChange={date => setDate(date)} />
      <DatePicker placeholderText="Data  de vencimento" selected={due_date} onChange={date => setDueDate(date)} />
      <Button styleButton="primary" label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
