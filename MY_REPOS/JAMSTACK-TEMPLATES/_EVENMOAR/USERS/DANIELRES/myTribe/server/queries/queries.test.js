import { addMember } from "../commands/addMember";
import { findMemberBySlug, getMembers } from "./queries";

describe("findMemberBySlug", () => {
  test("finds a member by its slug", async (done) => {
    await addMember({ displayName: `Tom`, slug: `tom` });

    expect((await findMemberBySlug("tom")).displayName).toEqual("Tom");

    done();
  });
});

describe("getMembers", () => {
  test("gets the list of members", async (done) => {
    await addMember({ displayName: `Tom`, slug: `tom` });
    await addMember({ displayName: `Jan`, slug: `jan` });

    expect((await getMembers()).length).toEqual(2);

    done();
  });
});
