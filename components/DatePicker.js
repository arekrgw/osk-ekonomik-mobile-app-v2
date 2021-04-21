import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = props => {
  return (
    <DateTimePicker
      value={props.date}
      mode={props.mode}
      showIcon={false}
      is24Hour={true}
      placeholder={props.placeholder}
      confirmBtnText="OK"
      cancelBtnText="Anuluj"
      onChange={(ev, date) => props.onDateChange(date)}
    />
  );
};

export default DatePicker;
