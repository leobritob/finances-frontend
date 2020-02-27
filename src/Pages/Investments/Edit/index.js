//@flow
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

export default function InvestmentsEdit({ match }: { match: Object }) {
  const history = useHistory();
  const investmentId = Number(match.params.id);
  const [investmentTypes, setInvestmentTypes] = useState({
    total: 0,
    page: 1,
    perPage: 20,
    lastPage: 0,
    data: [],
  });
  const [investmentType, setInvestmentType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [due_date, setDueDate] = useState('');
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompanyId] = useState({});

  useEffect(() => {
    _getInvestmentById(investmentId);
    _getAllCompanies();
  }, [investmentId]);

  useEffect(() => {
    _getAllInvestmentsTypes({ company_id: company_id.value });
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

  async function _getInvestmentById(id: number) {
    try {
      const response = await Services.investments.getInvestmentsById(id);
      if (response.status === 200) {
        const {
          name,
          description,
          value,
          date,
          due_date,
          investments_type_id,
          investments_type_name,
          company_id,
          company_fantasy_name,
        } = response.data;
        setInvestmentType({ label: investments_type_name, value: investments_type_id });
        setName(name);
        setDescription(description);
        setValue(value);
        setDate(new Date(date));
        setDueDate(new Date(due_date));
        setCompanyId({ label: company_fantasy_name, value: company_id });
      }
    } catch (e) {
      console.error('_getInvestmentById/ERROR', e.message);
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
      const response = await Services.investments.updateInvestments(investmentId, {
        company_id: company_id.value,
        investments_type_id: investmentType.value,
        name,
        description,
        value,
        date,
        due_date,
      });
      if (response.status === 200) {
        toast.success('Investimento atualizado com sucesso');

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
          { label: 'Alterar' },
        ]}
      />
      <Title>Alterar Investimento</Title>

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
        label="Tipo de Investimento"
        placeholder="Selecione o tipo do investimento"
        options={investmentTypes}
        value={investmentType}
        onChange={option => setInvestmentType(option)}
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

InvestmentsEdit.propTypes = {
  match: PropTypes.object,
};
