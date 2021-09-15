export const toHome = () => ({ type: 'HOME' })

export const toPerson = ({ id }) => ({ type: 'PERSON', payload: { id } })
