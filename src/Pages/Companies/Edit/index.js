import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Breadcrumbs from 'Components/Breadcrumbs';
import Title from 'Components/Title';
import Input from 'Components/Input';
import Button from 'Components/Button';
import Services from 'Services';
import { toast } from 'react-toastify';
import { history } from 'Config/Store';
import { SEO } from 'Utils';
import Row from 'Components/Row';
import Column from 'Components/Column';

export default function CompaniesEdit({ match }) {
  const companyId = Number(match.params.id);
  const [social_name, setSocialName] = useState('');
  const [fantasy_name, setFantasyName] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [telephone, setTelephone] = useState('');
  const [street_name, setStreetName] = useState('');
  const [street_number, setStreetNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');
  const [country, setCountry] = useState('');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    SEO.changeDocumentTitle('Empresas');
    _getCompanyById(companyId);
  }, [companyId]);

  async function _getCompanyById(id: number) {
    try {
      const response = await Services.companies.getCompanyById(id);
      if (response.status === 200) {
        const {
          social_name,
          fantasy_name,
          cnpj,
          email,
          cellphone,
          telephone,
          street_name,
          street_number,
          district,
          city,
          uf,
          country,
          logo
        } = response.data;
        setSocialName(social_name);
        setFantasyName(fantasy_name);
        setCNPJ(cnpj);
        setEmail(email);
        setCellphone(cellphone);
        setTelephone(telephone);
        setStreetName(street_name);
        setStreetNumber(street_number);
        setDistrict(district);
        setCity(city);
        setUF(uf);
        setCountry(country);
        setLogo(logo);
      }
    } catch (e) {
      console.error('_getCompanyById/ERROR', e.message);
    }
  }

  async function _save() {
    try {
      const response = await Services.companies.storeCompany({
        social_name,
        fantasy_name,
        cnpj,
        email,
        cellphone,
        telephone,
        street_name,
        street_number,
        district,
        city,
        uf,
        country,
        logo
      });
      if ([200, 201].includes(response.status)) {
        toast.success('Empresa atualizada com sucesso');

        history.push('/companies');
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
          { label: 'Empresas', href: '/companies' },
          { label: 'Alterar' }
        ]}
      />
      <Title>Alterar Empresa</Title>

      <Row>
        <Column>
          <Input
            name="social_name"
            value={social_name}
            onChange={e => setSocialName(e.target.value)}
            placeholder="Razão Social"
            autoComplete="off"
          />
        </Column>
        <Column>
          <Input
            value={fantasy_name}
            onChange={e => setFantasyName(e.target.value)}
            placeholder="Nome Fantasia"
            autoComplete="off"
          />
        </Column>
        <Column>
          <Input value={cnpj} onChange={e => setCNPJ(e.target.value)} placeholder="CNPJ" autoComplete="off" />
        </Column>
      </Row>
      <Row columns="2fr 1fr 1fr">
        <Column>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" autoComplete="off" />
        </Column>
        <Column>
          <Input
            value={cellphone}
            onChange={e => setCellphone(e.target.value)}
            placeholder="Celular (DDD)"
            autoComplete="off"
          />
        </Column>
        <Column>
          <Input
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            placeholder="Telefone (DDD)"
            autoComplete="off"
          />
        </Column>
      </Row>
      <Row columns="2fr 120px 1fr">
        <Column>
          <Input
            value={street_name}
            onChange={e => setStreetName(e.target.value)}
            placeholder="Endereço"
            autoComplete="off"
          />
        </Column>
        <Column>
          <Input
            value={street_number}
            onChange={e => setStreetNumber(e.target.value)}
            placeholder="Número"
            autoComplete="off"
          />
        </Column>
        <Column>
          <Input value={district} onChange={e => setDistrict(e.target.value)} placeholder="Bairro" autoComplete="off" />
        </Column>
      </Row>

      <Row columns="1fr 60px 120px">
        <Column>
          <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" autoComplete="off" />
        </Column>
        <Column>
          <Input value={uf} onChange={e => setUF(e.target.value)} placeholder="UF" autoComplete="off" />
        </Column>
        <Column>
          <Input value={country} onChange={e => setCountry(e.target.value)} placeholder="País" autoComplete="off" />
        </Column>
      </Row>
      <Button label="Salvar" icon="check" allowSpinnerLoading={true} onClick={_save} />
    </Container>
  );
}
