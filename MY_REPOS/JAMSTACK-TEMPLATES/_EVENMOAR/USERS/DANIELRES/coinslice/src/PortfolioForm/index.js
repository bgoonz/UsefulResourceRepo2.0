// @flow
import { connect } from "react-redux";

import {
  resetForm,
  setErrors,
  updateForm,
} from "../store/portfolioForm/actions";
import { addEntry, removeEntry } from "../store/portfolio/actions";
import PortfolioForm from "./PortfolioForm";
import validateForm from "../utils/validateForm";

import { PortfolioNewEntrySchema } from "../schemas";

export default connect(
  ({ portfolioForm }) => ({
    portfolioForm: {
      ...portfolioForm,
      hasErrors: !!Object.keys(portfolioForm.errors).length,
    },
  }),
  (dispatch) => ({
    onSubmit: (entry) => {
      const errors = validateForm(entry, PortfolioNewEntrySchema);
      errors ? dispatch(setErrors(errors)) : dispatch(addEntry(entry));
    },
    updateForm: ({ target: { name, value } }) =>
      dispatch(updateForm({ [name]: value })),
  })
)(PortfolioForm);
