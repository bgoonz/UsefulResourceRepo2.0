import { ng } from "../../utils/process";
import { expectToFail } from "../../utils/utils";
import { deleteFile } from "../../utils/fs";

export default function () {
  return (
    deleteFile("src/app/app.component.ts")
      // This is supposed to fail since there's a missing file
      .then(() => expectToFail(() => ng("build")))
  );
}
