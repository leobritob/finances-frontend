import React from 'react';
import PropTypes from 'prop-types';
import { Container, List, Item, ItemLink } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function doPagination(current, total) {
  var list = [];
  var pageLimit = 5;
  var upperLimit, lowerLimit;
  var currentPage = (lowerLimit = upperLimit = Math.min(current, total));

  for (var b = 1; b < pageLimit && b < total; ) {
    if (lowerLimit > 1) {
      lowerLimit--;
      b++;
    }
    if (b < pageLimit && upperLimit < total) {
      upperLimit++;
      b++;
    }
  }

  for (var i = lowerLimit; i <= upperLimit; i++) {
    list.push({
      isCurrent: i === currentPage,
      number: i
    });
  }
  return list;
}

export default function Pagination({ page, perPage, total, paginationOnChange }) {
  const numberOfPages = Math.ceil(total / perPage);
  const pagesComponentsList = doPagination(page, numberOfPages).map((item, index) => (
    <Item key={index}>
      <ItemLink isCurrent={item.isCurrent} onClick={() => paginationOnChange(item.number)}>
        {item.number}
      </ItemLink>
    </Item>
  ));

  return (
    <Container>
      <List>
        <Item>
          <ItemLink href="#" onClick={() => paginationOnChange(page > 1 ? page - 1 : 1)}>
            <FontAwesomeIcon icon="arrow-left" color="#333333" />
          </ItemLink>
        </Item>
        {pagesComponentsList}
        <Item>
          <ItemLink href="#" onClick={() => paginationOnChange(page < numberOfPages ? page + 1 : page)}>
            <FontAwesomeIcon icon="arrow-right" color="#333333" />
          </ItemLink>
        </Item>
      </List>
    </Container>
  );
}

Pagination.prototype = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  goToPage: PropTypes.func,
  prevOnClick: PropTypes.func,
  nextOnClick: PropTypes.func
};
