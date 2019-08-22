import React from "react";
import PropTypes from "prop-types";
import { Container, List, Item, Link, Text } from "./styles";

export default function Breadcrumbs({ data }) {
  return (
    <Container>
      <List>
        {data.map((item, index) => (
          <Item key={index}>
            {item.href && <Link to={item.href}>{item.label}</Link>}
            {!item.href && <Text>{item.label}</Text>}
          </Item>
        ))}
      </List>
    </Container>
  );
}

Breadcrumbs.prototype = {
  data: PropTypes.array
};
