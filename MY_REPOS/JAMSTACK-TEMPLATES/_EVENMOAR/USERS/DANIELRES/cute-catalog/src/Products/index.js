import { connect } from "react-redux";

import Products from "./Products";

import { selectProducts } from "store/products/selectors";

const mapStateToProps = (state) => ({
  products: selectProducts(state),
});

export default connect(mapStateToProps)(Products);
