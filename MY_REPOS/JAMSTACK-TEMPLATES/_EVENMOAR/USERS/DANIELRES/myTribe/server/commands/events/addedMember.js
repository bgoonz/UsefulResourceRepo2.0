export default (tx, attrs) =>
  tx
    .insert({ type: "addedMember", attrs })
    .returning("*")
    .into("events")
    .then((resp) => resp[0])
    .catch((e) => {
      throw new Error(e);
    });
