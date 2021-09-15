import { connect } from "react-redux";

import * as api from "api";
import { openModal } from "Modals/bus";

import RegisterForm from "./RegisterForm";

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({
  onSubmit: async (values) => {
    try {
      const { registrationTokenMaxAge } = (await api.postRegisterForm(values))
        .info;
      openModal("REGISTRATION_PENDING", { registrationTokenMaxAge });
    } catch (e) {
      openModal("ERROR", e);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
