import React, { useState, useEffect } from 'react';
import { SEO } from 'Utils';
import { Container } from './styles';
import Title from 'Components/Title';
import ReportsBox from 'Components/ReportsBox';
import { COLORS } from 'Themes';
import Breadcrumbs from 'Components/Breadcrumbs';
import { Bar, Doughnut } from 'react-chartjs-2';
import Row from 'Components/Row';
import Column from 'Components/Column';
import Services from 'Services';
import Select from 'Components/Select';
import { format, subMonths, lastDayOfMonth } from 'date-fns';

const today = new Date();

const filterOptions = [
  {
    label: 'Ano',
    value: {
      start_date: format(today, 'yyyy-01-01'),
      end_date: format(today, 'yyyy-12-31')
    }
  },
  {
    label: 'Mês Passado',
    value: {
      start_date: format(subMonths(today, 1), 'yyyy-MM-01'),
      end_date: format(subMonths(lastDayOfMonth(today), 1), 'yyyy-MM-dd')
    }
  },
  {
    label: 'Mês Atual',
    value: {
      start_date: format(today, 'yyyy-MM-01'),
      end_date: format(today, 'yyyy-MM-dd')
    }
  }
];

export default function Dashboard() {
  const [filter, setFilter] = useState(filterOptions[2]);
  const [dashboardGeneral, setDashboardGeneral] = useState({
    revenue: 0,
    expenses: 0,
    net_revenue: 0,
    investments: 0
  });
  const [dashboardGeneralWithMonths, setDashboardGeneralWithMonths] = useState([]);
  const [dashboardGeneralInvestments, setDashboardGeneralInvestments] = useState([]);
  const revenueData = {
    labels: dashboardGeneralWithMonths.map(dashboard => dashboard.month_label),
    datasets: [
      {
        label: 'Receitas',
        backgroundColor: COLORS.revenue,
        borderColor: COLORS.revenue,
        borderWidth: 1,
        hoverBackgroundColor: COLORS.revenue,
        hoverBorderColor: COLORS.revenue,
        data: dashboardGeneralWithMonths.map(month => month.revenue)
      }
    ]
  };

  const expensesData = {
    labels: dashboardGeneralWithMonths.map(dashboard => dashboard.month_label),
    datasets: [
      {
        label: 'Despesas',
        backgroundColor: COLORS.expenses,
        borderColor: COLORS.expenses,
        borderWidth: 1,
        hoverBackgroundColor: COLORS.expenses,
        hoverBorderColor: COLORS.expenses,
        data: dashboardGeneralWithMonths.map(month => month.expenses)
      }
    ]
  };

  const doughnutData = {
    labels: dashboardGeneralInvestments.map(investment => investment.name),
    datasets: [
      {
        data: dashboardGeneralInvestments.map(investment => investment.value),
        backgroundColor: dashboardGeneralInvestments.map(investment => investment.color),
        hoverBackgroundColor: dashboardGeneralInvestments.map(investment => investment.color)
      }
    ]
  };

  const reportsData = [
    {
      label: 'Receita',
      value: dashboardGeneral.revenue,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Despesas',
      value: dashboardGeneral.expenses,
      styles: {
        boxBackgroundColor: COLORS.expenses,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Líquido',
      value: dashboardGeneral.net_revenue,
      styles: {
        boxBackgroundColor: COLORS.net,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    },
    {
      label: 'Investimento',
      value: dashboardGeneral.investments,
      styles: {
        boxBackgroundColor: COLORS.investment,
        valueTextColor: '#ffffff',
        labelTextColor: '#ffffff'
      }
    }
  ];

  useEffect(() => {
    SEO.changeDocumentTitle('Dashboard');
  }, []);

  useEffect(() => {
    _getDashboardGeneral(filter.value);
    _getDashboardGeneralWithMonths();
    _getDashboardGeneralInvestments(filter.value);
  }, [filter]);

  async function _getDashboardGeneral(params: Object = {}) {
    try {
      const response = await Services.dashboard.getDashboardGeneral(params);
      if (response.status === 200) {
        setDashboardGeneral(response.data);
      }
    } catch (e) {
      console.error('_getDashboardGeneral', e.message);
    }
  }

  async function _getDashboardGeneralWithMonths(params: Object = {}) {
    try {
      const response = await Services.dashboard.getDashboardGeneralWithMonths(params);
      if (response.status === 200) {
        setDashboardGeneralWithMonths(response.data);
      }
    } catch (e) {
      console.error('_getDashboardGeneral', e.message);
    }
  }

  async function _getDashboardGeneralInvestments(params: Object = {}) {
    try {
      const response = await Services.dashboard.getDashboardGeneralInvestments(params);
      if (response.status === 200) {
        setDashboardGeneralInvestments(response.data);
      }
    } catch (e) {
      console.error('_getDashboardGeneral', e.message);
    }
  }

  return (
    <Container>
      <Breadcrumbs data={[{ label: 'Dashboard' }]} />

      <Title>Dashboard</Title>

      <Row>
        <Column>
          <Select
            isSearchable
            label="Categoria"
            placeholder="Selecione uma categoria"
            options={filterOptions}
            value={filter}
            onChange={option => setFilter(option)}
          />
        </Column>
        <Column />
        <Column />
        <Column />
      </Row>

      <ReportsBox data={reportsData} />

      <Row>
        <Column>
          <Title>Receita</Title>
          <div>
            <Bar data={revenueData} height={250} />
          </div>
        </Column>
        <Column>
          <Title>Despesas</Title>
          <div>
            <Bar data={expensesData} height={250} />
          </div>
        </Column>
        <Column>
          <Title>Investimentos</Title>
          <div>
            <Doughnut data={doughnutData} height={200} options={{ responsive: true }} />
          </div>
        </Column>
      </Row>
    </Container>
  );
}
