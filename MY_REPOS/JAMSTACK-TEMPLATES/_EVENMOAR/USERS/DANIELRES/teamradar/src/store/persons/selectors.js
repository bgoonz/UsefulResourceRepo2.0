export const selectPerson = ({
  location: {
    payload: { id },
  },
  persons: { items },
}) => ({ ...items[id], id })

export const selectPersons = ({ persons: { items } }) =>
  Object.entries(items).map(([k, v]) => ({ id: k, ...v }))
