export default () => {
  const rand = Math.random();

  return {
    displayName: `Mem-${rand}`,
    infos: {
      addedAt: new Date(),
      address: "Sunny street",
      email: `${rand}@example.com`,
      fbProfileUrl: "http://...",
      firstName: "Member",
      introUrl: "http://...",
      lastName: `${rand}`,
      phone: `+49 ${rand}`,
    },
    invitedBy: null,
    slug: `mem-${rand}`,
  };
};
