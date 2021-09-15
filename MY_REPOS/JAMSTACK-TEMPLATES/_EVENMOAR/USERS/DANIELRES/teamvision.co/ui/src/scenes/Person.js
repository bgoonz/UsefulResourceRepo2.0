import { useMutation, useQuery } from "@apollo/react-hooks";
import classnames from "classnames";
import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import Autosuggest from "../components/forms/TagAutoSuggest";
import Level from "../components/taggings/Level";
import { GET_PERSON_WITH_TAGGINGS, UPDATE_PERSON } from "../gql/persons";
import { formatDate } from "../utils/dates";

const TaggingsTable = ({ personId, taggings, colorClass = "" }) => (
  <div className="table w-full">
    {taggings.map(t => (
      <div key={t.tag.name} className="table-row">
        <div className="table-cell w-32">
          <Link to={`/persons/${personId}/${t.tag.name}`}>{t.tag.name}</Link>
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

const EditableField = ({ object, field }) => {
  // eslint-disable-next-line no-unused-vars
  const [updatePerson, response] = useMutation(UPDATE_PERSON);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(object[field]);

  const onSubmit = e => {
    e.preventDefault();
    updatePerson({ variables: { id: object.id, [field]: value } }).then(() =>
      setIsEditing(false)
    );
  };

  if (isEditing)
    return (
      <form className="flex" onSubmit={onSubmit}>
        <input
          type="text"
          className="bg-gray-200 rounded mr-2 px-2 py-1"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setIsEditing(false)}
        />
        {/* <button className="btn-transparent hover:bg-blue-500 hover:text-white mr-2">
          V
        </button>
        <button className="btn-transparent hover:bg-blue-500 hover:text-white">
          X
        </button> */}
      </form>
    );
  return (
    <div
      className="hover:bg-yellow-200 inline-block py-1 cursor-pointer"
      onClick={() => setIsEditing(true)}
      style={{ minWidth: "7rem" }}
    >
      {object[field] || <div className="text-gray-500 w-1/2 block">—</div>}
    </div>
  );
};

const Person = ({ match, location, history }) => {
  const { id: personId } = match.params;
  const { loading, error, data, refetch } = useQuery(GET_PERSON_WITH_TAGGINGS, {
    variables: { id: personId }
  });

  if (loading) return <p className="card">Loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const motivations = data.person.taggings.filter(t => t.on === "motivations");
  const skills = data.person.taggings.filter(t => t.on === "skills");

  return (
    <div>
      <section className="w-full card md:flex">
        <div className="text-center">
          <div className="w-24 h-24 md:w-48 md:h-48 inline-block">
            <Avatar size="full" src={data.person.picture} />
          </div>
        </div>

        <div className="w-full md:ml-8 md:pl-4">
          <div className="mb-4 leading-tight">
            <h2 className="text-lg md:text-xl">
              <EditableField object={data.person} field="name" />
            </h2>
            <div className="text-gray-700">
              <EditableField object={data.person} field="headline" />
            </div>
          </div>

          <div className="text-sm md:text-base">
            <div className="flex items-baseline">
              <div className="w-32 text-gray-700">Current position</div>
              <div className="text-black">
                <EditableField object={data.person} field="currentPosition" />
              </div>
            </div>
            <div className="flex items-baseline">
              <div className="w-32 text-gray-700">Email</div>
              <EditableField object={data.person} field="email" />
            </div>
            <div className="flex items-baseline">
              <div className="w-32 text-gray-700">Added</div>
              <div className="text-black py-1">
                {formatDate(data.person.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="card">
        <h3 className="mb-4 text-lg">Motivations</h3>
        <TaggingsTable
          colorClass="text-pink-600"
          personId={personId}
          taggings={motivations}
        />

        <div className="w-32 py-2">
          <Autosuggest
            onSuccess={refetch}
            on="motivations"
            type="Person"
            id={personId}
          />
        </div>
      </div>
      <div className="card">
        <h3 className="mb-4 text-lg">Skills</h3>
        <TaggingsTable
          colorClass="text-blue-600"
          personId={personId}
          taggings={skills}
        />

        <div className="w-32 py-2">
          <Autosuggest
            onSuccess={refetch}
            on="skills"
            type="Person"
            id={personId}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Person);
