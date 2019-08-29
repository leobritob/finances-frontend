import React from 'react';
import Input from 'Components/Input';
import DatePicker from 'react-datepicker';

export default function DatePickerComponent(props) {
  return <DatePicker locale="pt-BR" dateFormat="dd/MM/yyyy" customInput={<Input />} {...props} />;
}
