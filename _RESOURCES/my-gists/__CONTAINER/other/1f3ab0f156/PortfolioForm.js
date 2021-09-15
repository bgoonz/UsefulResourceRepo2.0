const isDateInFuture = (date) => {
  if (!date) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return !(date > today);
};
