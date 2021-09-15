useEffect(() => {
  register(
    { name: "startDate", type: "custom" },
    { validate: { isDateInFuture } }
  );
  register(
    { name: "endDate", type: "custom" },
    { validate: { isDateInFuture } }
  );
}, []);
