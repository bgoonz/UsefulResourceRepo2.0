import { connect } from "react-redux";

import { openModal } from "Modals/bus";
import { postLoginEmailPasswordForm } from "api";
import { toHome } from "store/routerActions";

import EmailPasswordForm from "./EmailPasswordForm";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: async (values) => {
    try {
      await postLoginEmailPasswordForm(values);
      setTimeout(() => dispatch(toHome()), 200);
    } catch (e) {
      openModal("ERROR", { message: e.message });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailPasswordForm);
