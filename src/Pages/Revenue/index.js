import React, { useState, useEffect } from "react";
import Title from "Components/Title";
import { Container } from "./styles";
import ReportsBox from "Components/ReportsBox";
import DataTable from "Components/DataTable";
import { format } from "date-fns";
import { COLORS } from "Themes";
import Breadcrumbs from "Components/Breadcrumbs";
import { history } from "Config/Store";
import Services from "Services";
import { useDebounce } from "use-debounce";

function Revenue() {
  const [page, setPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filter, setFilter] = useState({ billing_cycles_type: 1, search: "" });
  const [revenue, setRevenue] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: []
  });

  const [filterDebounce] = useDebounce(filter, 300);

  useEffect(() => {
    _getAllRevenues(filterDebounce);
  }, [filterDebounce]);

  function renderItem(column, item) {
    switch (column) {
      case "date":
        return format(new Date(item[column]), "dd/MM/yyyy");
      case "value":
        return Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(item[column]);
      default:
        return item[column];
    }
  }

  async function _getAllRevenues(params = {}) {
    try {
      const response = await Services.billingCycles.getAllBillingCycles(params);
      if (response.status === 200) {
        setRevenue(response.data);
      }
    } catch (e) {
      console.log("_getAllRevenues/ERROR", e.message);
    }
  }

  function _searchBarHandler(e) {
    const search = e.target.value;

    setSearchBarValue(search);
    setFilter({ ...filter, search });
  }

  function _fromHandler(from) {
    setFromDate(from);
    from = format(new Date(from), "yyyy-MM-dd");

    setFilter({ ...filter, created_at__gte: from });
  }

  function _toHandler(to) {
    setToDate(to);
    to = format(new Date(to), "yyyy-MM-dd");

    setFilter({ ...filter, created_at__lte: to });
  }

  return (
    <Container>
      <Breadcrumbs
        data={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Receitas" }
        ]}
      />
      <Title>Receitas</Title>
      <ReportsBox
        data={[
          {
            label: "Hoje",
            value: 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: "#ffffff",
              labelTextColor: "#ffffff"
            }
          },
          {
            label: "Mês Atual",
            value: 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: "#ffffff",
              labelTextColor: "#ffffff"
            }
          },
          {
            label: "Mês Passado",
            value: 0,
            styles: {
              boxBackgroundColor: COLORS.revenue,
              valueTextColor: "#ffffff",
              labelTextColor: "#ffffff"
            }
          }
        ]}
      />

      <Title>Extrato</Title>
      <DataTable
        renderItem={renderItem}
        columns={[
          { id: "description", label: "Descricão" },
          { id: "date", label: "Data", width: 250 },
          { id: "value", label: "Valor", width: 200 }
        ]}
        data={revenue.data}
        page={page}
        perPage={revenue.perPage}
        total={revenue.total}
        paginationOnChange={setPage}
        addButtonIsVisible={true}
        addButtonOnClick={() => history.push("/revenue/add")}
        searchBarIsVisible={true}
        searchBarValue={searchBarValue}
        searchBarOnChange={_searchBarHandler}
        searchBarOnClick={search => setFilter({ ...filter, search })}
        fromIsVisible={true}
        fromOnChange={_fromHandler}
        fromValue={fromDate}
        toIsVisible={true}
        toOnChange={_toHandler}
        toValue={toDate}
      />
    </Container>
  );
}

export default Revenue;
