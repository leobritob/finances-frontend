import React, { useEffect } from "react";
import { SEO } from "Utils";
import { Container } from "./styles";
import Title from "Components/Title";
import ReportsBox from "Components/ReportsBox";
import { COLORS } from "Themes";
import Breadcrumbs from "Components/Breadcrumbs";
import { Bar, Doughnut } from "react-chartjs-2";
import Row from "Components/Row";
import Column from "Components/Column";

export default function Dashboard() {
  const revenueData = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Marco",
      "Abril",
      "Maio",
      "Junho",
      "Julho"
    ],
    datasets: [
      {
        label: "Receitas",
        backgroundColor: COLORS.revenue,
        borderColor: COLORS.revenue,
        borderWidth: 1,
        hoverBackgroundColor: COLORS.revenue,
        hoverBorderColor: COLORS.revenue,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const expensesData = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Marco",
      "Abril",
      "Maio",
      "Junho",
      "Julho"
    ],
    datasets: [
      {
        label: "Despesas",
        backgroundColor: COLORS.expenses,
        borderColor: COLORS.expenses,
        borderWidth: 1,
        hoverBackgroundColor: COLORS.expenses,
        hoverBorderColor: COLORS.expenses,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const doughnutData = {
    labels: ["Tesouro SELIC", "Acão", "FII"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  const reportsData = [
    {
      label: "Receita",
      value: 10000,
      styles: {
        boxBackgroundColor: COLORS.revenue,
        valueTextColor: "#ffffff",
        labelTextColor: "#ffffff"
      }
    },
    {
      label: "Despesas",
      value: 3500,
      styles: {
        boxBackgroundColor: COLORS.expenses,
        valueTextColor: "#ffffff",
        labelTextColor: "#ffffff"
      }
    },
    {
      label: "Líquido",
      value: 6500,
      styles: {
        boxBackgroundColor: COLORS.net,
        valueTextColor: "#ffffff",
        labelTextColor: "#ffffff"
      }
    },
    {
      label: "Investimento",
      value: 150000,
      styles: {
        boxBackgroundColor: COLORS.investment,
        valueTextColor: "#ffffff",
        labelTextColor: "#ffffff"
      }
    }
  ];

  useEffect(() => {
    SEO.changeDocumentTitle("Dashboard");
  });

  return (
    <Container>
      <Breadcrumbs data={[{ label: "Dashboard" }]} />
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
