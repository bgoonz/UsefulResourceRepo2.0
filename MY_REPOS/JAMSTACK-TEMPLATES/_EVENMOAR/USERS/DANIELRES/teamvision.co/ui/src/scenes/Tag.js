import { useQuery } from "@apollo/react-hooks";
import classnames from "classnames";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Level from "../components/taggings/Level";
import { GET_TAG_WITH_TAGGINGS } from "../gql/tags";
import Branch from "./Tags/Branch";

const TaggingsTable = ({ tagName, taggings, colorClass = "" }) => (
  <div className="table w-full">
    {taggings.map(t => (
      <div className="table-row">
        <div className="table-cell w-32">
          <Link to={`/persons/${t.person.id}/${tagName}`}>{t.person.name}</Link>
        </div>
        <div
          className={classnames(
            "table-cell w-16 md:text-right",
            t.level ? colorClass : "text-gray-500"
          )}
        >
          <Level tagging={t} />
        </div>
        <div className="table-cell text-sm pl-4 md:pl-12">
          <div className="truncate w-64 text-gray-600">{t.description}</div>
        </div>
      </div>
    ))}
  </div>
);

const Tag = ({ match, location, history }) => {
  const { id } = match.params;
  const { loading, error, data } = useQuery(GET_TAG_WITH_TAGGINGS, {
    variables: { name: id }
  });

  if (loading) return <p className="card">Loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const motivations = data.tag.taggings.filter(t => t.on === "motivations");
  const skills = data.tag.taggings.filter(t => t.on === "skills");

  return (
    <div>
      <div className="mb-4 text-right mr-6 md:mr-0">
        <button
          title="Add to my motivations"
          className="bg-white hover:text-white hover:bg-pink-500 btn-transparent mr-4"
        >
          <b>+</b> Motivations
        </button>

        <button
          title="Add to my skills"
          className="bg-white hover:text-white hover:bg-blue-500 btn-transparent"
        >
          <b>+</b> Skills
        </button>
      </div>

      <div className="flex">
        <section
          className="card mr-4 hidden sm:block"
          style={{ whiteSpace: "nowrap" }}
        >
          <Branch node={data.tag.name} />
        </section>

        <div className="w-full">
          <section className="card ">
            <h2 className="text-lg mb-4">{data.tag.name}</h2>
            <div className="text-gray-700">{data.tag.description}</div>
          </section>

          {motivations.length > 0 && (
            <section className="card">
              <h2 className="text-lg mb-4">Motivations</h2>
              <TaggingsTable
                tagName={data.tag.name}
                taggings={motivations}
                colorClass="text-pink-500"
              />
            </section>
          )}

          {skills.length > 0 && (
            <section className="card">
              <h2 className="text-lg mb-4">Skills</h2>

              <TaggingsTable
                tagName={data.tag.name}
                taggings={skills}
                colorClass="text-blue-500"
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Tag);
