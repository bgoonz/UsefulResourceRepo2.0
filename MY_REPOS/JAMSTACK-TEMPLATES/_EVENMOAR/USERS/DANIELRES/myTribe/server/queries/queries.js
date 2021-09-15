import db from "../db/db";

const decorateMember = (member) => ({
  ...member,
  url: `/members/${member.slug}`,
});

const decorateLogItem = (item) => ({
  ...item,
  url: `/log/${item.id}`,
});

export const getLogItems = () =>
  db("events")
    .orderBy("createdAt", "desc")
    .map(decorateLogItem)
    .map((item) =>
      item.type === "addedMember"
        ? { ...item, attrs: decorateMember(item.attrs) }
        : item
    );

export const getMembers = () => db("members").map(decorateMember);

export const findMemberBySlug = (slug) =>
  db("members")
    .where({ slug })
    .map(decorateMember)
    .then((resp) => resp[0]);

export const findLogItemById = (id) =>
  db("events")
    .where({ id })
    .map(decorateLogItem)
    .then((resp) => resp[0])
    .then((item) =>
      item.type === "addedMember"
        ? { ...item, attrs: decorateMember(item.attrs) }
        : item
    );
