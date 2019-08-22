import React from "react";
import PropTypes from "prop-types";
import { Container, Box, Value, Label } from "./styles";

function ReportsBox({ data }) {
  return (
    <Container dataLength={data.length}>
      {data.map((item, index) => {
        const styles = item.styles || {};

        return (
          <Box key={index} backgroundColor={styles.boxBackgroundColor}>
            <Value textColor={styles.valueTextColor}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(item.value ? item.value : 0)}
            </Value>
            <Label textColor={styles.labelTextColor}>{item.label}</Label>
          </Box>
        );
      })}
    </Container>
  );
}

ReportsBox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      styles: PropTypes.shape({
        boxBackgroundColor: PropTypes.string,
        valueTextColor: PropTypes.string,
        labelTextColor: PropTypes.string
      })
    })
  )
};

export default ReportsBox;
