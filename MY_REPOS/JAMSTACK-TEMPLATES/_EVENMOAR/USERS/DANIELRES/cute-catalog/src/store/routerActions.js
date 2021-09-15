export const toAdmin = () => ({ type: "ADMIN" });

export const toHome = () => ({ type: "HOME" });

export const toLogin = () => ({ type: "LOGIN" });

export const toRegister = () => ({ type: "REGISTER" });

export const toAdminProduct = ({ productId }) => ({
  type: "ADMIN",
  query: { product: productId },
});

export const toProduct = ({ productId }) => ({
  type: "PRODUCT",
  payload: { productId },
});

export const toProfile = () => ({ type: "PROFILE" });
