const saveMember = (tx, attrs) =>
  tx
    .insert(attrs)
    .into("members")
    .catch((e) => {
      throw new Error(e);
    });

const execute = (tx, event) => {
  switch (event.type) {
    case "addedMember":
      return saveMember(tx, event.attrs);
    default:
      return Promise.reject(`Unknown event of type "${event.type}"`);
  }
};

const markPlayed = (tx, event) =>
  tx("events").where("id", "=", event.id).update({ isPlayed: true });

export default async (tx, event) => {
  try {
    await execute(tx, event);
    await markPlayed(tx, event);
  } catch (error) {
    throw new Error(error);
  }
};
