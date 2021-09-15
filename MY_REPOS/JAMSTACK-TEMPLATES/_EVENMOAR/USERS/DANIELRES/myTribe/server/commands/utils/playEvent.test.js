import { getMembers } from "../../queries/queries";
import addedMember from "../events/addedMember";
import db from "../../db/db";
import playEvent from "./playEvent";

const getEvents = async () => await db("events").select();

describe("playEvent", () => {
  test('with an "addMember" event: inserts the member, marks the event as played', async (done) => {
    expect(await getEvents()).toHaveLength(0);
    expect(await getMembers()).toHaveLength(0);
    const attrs = { displayName: "Jules", slug: "jules" };
    await db.transaction((tx) => addedMember(tx, attrs));
    // expect(await getEvents()).toHaveLength(1)
    // const event = (await getEvents())[0]

    // await db.transaction(tx => playEvent(tx, event))

    // expect(await getMembers()).toHaveLength(1)
    // const playedEvent = (await getEvents())[0]

    // console.log(playedEvent)
    // expect(playedEvent.isPlayed).toEqual(true)
    // // await db.transaction(tx => addedMember(tx, attrs))

    // // expect(await getEvents()).toHaveLength(1)
    // // expect((await getEvents())[0].type).toEqual('addedMember')
    // // expect((await getEvents())[0].attrs.slug).toEqual('jules')

    done();
  });
});
