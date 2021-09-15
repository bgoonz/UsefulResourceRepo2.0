const { register, handleSubmit, watch } = useForm();

const startDate = watch("startDate");
const endDate = watch("endDate");

useEffect(() => {
  register({ name: "startDate", type: "custom" });
  register({ name: "endDate", type: "custom" });
}, []);
