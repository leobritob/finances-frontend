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

export default function Dashboard() {
  const [dashboardGeneral, setDashboardGeneral] = useState({
    revenue: 0,
    expenses: 0,
    net_revenue: 0,
    investments: 0
  });
  const [dashboardGeneralWithMonths, setDashboardGeneralWithMonths] = useState([]);
  const [dashboardGeneralInvestments, setDashboardGeneralInvestments] = useState([]);
  const revenueData = {
    labels: dashboardGeneralWithMonths.map(dashboard => `${dashboard.short_month}/${dashboard.short_year}`),
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
    labels: dashboardGeneralWithMonths.map(dashboard => `${dashboard.short_month}/${dashboard.short_year}`),
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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
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
    _getDashboardGeneral();
    _getDashboardGeneralWithMonths();
    _getDashboardGeneralInvestments();
  }, []);

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
            <Doughnut data={doughnutData} height={200} />
          </div>
        </Column>
      </Row>
    </Container>
  );
}
