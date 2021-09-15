import faunadb from "faunadb";
import * as config from "../../../config";

export const client = new faunadb.Client({ secret: config.fauna.keys.admin });
