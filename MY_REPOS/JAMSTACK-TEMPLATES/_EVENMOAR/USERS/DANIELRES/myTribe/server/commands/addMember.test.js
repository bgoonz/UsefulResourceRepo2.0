import { addMember } from "./addMember";
import db from "../db/db";

const getMembers = async () => await db("members").select();
const getEvents = async () => await db("events").select();

describe("addMember command", () => {
  test(`inserts both event and member into the DB, 
        + marks the event as played,
        + prevents duplicates`, async (done) => {
    expect(await getMembers()).toHaveLength(0);
    expect(await getEvents()).toHaveLength(0);

    await addMember({ displayName: "Felix", slug: "felix" });
    expect(await getMembers()).toHaveLength(1);
    expect(await getEvents()).toHaveLength(1);

    expect(
      addMember({ displayName: "Felix", slug: "felix" })
    ).rejects.toBeDefined();
    expect(await getMembers()).toHaveLength(1);
    expect(await getEvents()).toHaveLength(1);

    expect((await getMembers())[0].slug).toEqual("felix");
    expect((await getEvents())[0].type).toEqual("addedMember");
    expect((await getEvents())[0].attrs.slug).toEqual("felix");

    done();
  });
});
