import { createBus } from "suber";

const bus = createBus();

export const imageUploadSuccess = (payload) =>
  bus.send("IMAGE_UPLOAD_SUCCESS", { payload });

export default bus;
