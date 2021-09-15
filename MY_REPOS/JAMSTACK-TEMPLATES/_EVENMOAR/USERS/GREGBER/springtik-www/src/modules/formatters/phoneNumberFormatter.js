const regExp = /\d(\d)(\d{2})(\d{2})(\d{2})(\d{2})/;

export const formatPhoneNumber = phoneNumber => {
  const matches = phoneNumber.match(regExp);
  return `+33 ${matches[1]} ${matches[2]} ${matches[3]} ${matches[4]} ${matches[5]}`;
};
