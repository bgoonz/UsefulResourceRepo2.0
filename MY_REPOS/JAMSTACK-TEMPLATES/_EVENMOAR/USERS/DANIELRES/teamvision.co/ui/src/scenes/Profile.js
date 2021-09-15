import { useQuery } from "@apollo/react-hooks";
import truncate from "lodash/truncate";
import React from "react";
import Avatar from "../components/Avatar";
import { GET_CURRENT_USER_INFO } from "../gql/user";
import { formatDate } from "../utils/dates";
import { upperFirst } from "../utils/strings";

const format = ({ key, value }) => {
  if (["createdAt", "updatedAt", "created_at", "updated_at"].includes(key))
    return formatDate(value);

  return truncate(value, { length: 60, separator: "&hellip;" });
};

export default function() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER_INFO);

  if (loading) return <p className="card">Loading profile...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <section className="card">
      <div className="md:flex">
        <div className="text-center">
          <div className="w-24 h-24 md:w-48 md:h-48 inline-block mb-2 md:mt-6">
            <Avatar size="full" src={data.userInfo.picture} />
          </div>
        </div>

        <div className="mb-4 w-full md:ml-4">
          <h2 className="text-lg ">Authentication data (Private)</h2>
          <div className="bg-gray-100 p-4 border rounded text-gray-700 ">
            {Object.entries(data.userInfo)
              .filter(([k, v]) => !k.startsWith("__"))
              .filter(([k, v]) => !String(v).startsWith("http"))
              .map(([key, value]) => (
                <div className="flex mb-1" key={key}>
                  <div className="w-1/2">
                    {upperFirst(key.replace("_", " "))}
                  </div>
                  <div>{format({ key, value })}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
