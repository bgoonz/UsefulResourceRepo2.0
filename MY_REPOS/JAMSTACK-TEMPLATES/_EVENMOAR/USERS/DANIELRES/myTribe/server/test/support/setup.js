import disconnectDb from "./disconnectDb";
import resetDb from "./resetDb";

beforeEach(resetDb);
afterAll(() => resetDb().then(disconnectDb));
