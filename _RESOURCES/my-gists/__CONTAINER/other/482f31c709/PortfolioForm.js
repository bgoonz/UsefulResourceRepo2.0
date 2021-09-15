<DatePicker
  showYearDropdown
  selected={startDate}
  onChange={handleDateChange('startDate')}
/>
  { errors.startDate &&
  <Alert variant="danger">
    { errors.startDate?.type === "isDateInFuture" && <p>Please choose present or past date!</p> }
  </Alert>
  }
</DatePicker>



<DatePicker
  showYearDropdown
  selected={endDate}
  onChange={handleDateChange('endDate')}
/>
  { errors.endDate &&
    <Alert variant="danger">
      { errors.endDate?.type === "isDateInFuture" && <p>Please choose present or past date!</p> }
    </Alert>
  }
</DatePicker>