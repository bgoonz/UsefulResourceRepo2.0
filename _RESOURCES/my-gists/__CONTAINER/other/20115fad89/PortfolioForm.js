const { register, handleSubmit, watch, setValue } = useForm();

const handleDateChange = dateType => date => {
  setValue(dateType, date)
};


<DatePicker
  showYearDropdown
  selected={startDate}
  onChange={handleDateChange('startDate')}
/>


<DatePicker
  showYearDropdown
  selected={endDate}
  onChange={handleDateChange('endDate')}
/>