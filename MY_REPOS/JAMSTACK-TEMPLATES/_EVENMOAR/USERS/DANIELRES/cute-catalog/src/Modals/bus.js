import { createBus } from "suber";

const bus = createBus();

export const closeModal = () => bus.send("CLOSE_MODAL");

export const openModal = (name, payload) =>
  bus.send("OPEN_MODAL", { name, payload });

export default bus;
