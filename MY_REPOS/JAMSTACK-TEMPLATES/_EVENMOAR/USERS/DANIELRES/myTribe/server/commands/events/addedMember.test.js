import addedMember from "./addedMember";
import db from "../../db/db";

const getEvents = async () => await db("events").select();

describe("addedMember event", () => {
  test('inserts an event of type "addedMember" using a passed transaction', async (done) => {
    expect(await getEvents()).toHaveLength(0);

    const attrs = { displayName: "Jules", slug: "jules" };

    await db.transaction((tx) => addedMember(tx, attrs));

    expect(await getEvents()).toHaveLength(1);
    expect((await getEvents())[0].type).toEqual("addedMember");
    expect((await getEvents())[0].attrs.slug).toEqual("jules");

    done();
  });
});
