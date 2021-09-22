import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";

const PortfolioForm = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={null}
            onChange={(date) => {
              alert(date);
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={null}
            onChange={(date) => {
              alert(date);
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default PortfolioForm;
