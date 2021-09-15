import { useRouter } from "next/router";
import Modal from "./modal";
import AddActivityForm from "./addActivityForm";
import { createActivity } from "../actions";

const AddActivityButton = () => {
  const router = useRouter();
  let modal = null;

  const HandleAddActivity = (activity) => {
    createActivity(activity).then((activities) => {
      console.log(JSON.stringify(activities));
      modal.closeModal();
      router.push("/");
    });
  };

  return (
    <div>
      <Modal ref={(ele) => (modal = ele)} hasSubmit={false}>
        <AddActivityForm handleFormSubmit={HandleAddActivity} />
      </Modal>
    </div>
  );
};

export default AddActivityButton;
