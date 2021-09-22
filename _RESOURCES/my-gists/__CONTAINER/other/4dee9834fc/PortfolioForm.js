const {
  register,
  handleSubmit,
  errors,
  setError,
  clearError,
  watch,
  setValue,
} = useForm();

const handleDateChange = (dateType) => (date) => {
  if (!isDateInFuture(date)) {
    setError(dateType, "isDateInFuture");
  } else {
    clearError(dateType, "isDateInFuture");
  }
  setValue(dateType, date);
};
