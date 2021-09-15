import { useMutation, useQuery } from "@apollo/react-hooks";
import classnames from "classnames";
import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Level from "../components/taggings/Level";
import { GET_PERSON_WITH_TAGGINGS } from "../gql/persons";
import { SET_TAG_ON, UPDATE_TAGGING } from "../gql/tags";

const Tagging = ({ tagging, title, colorClass, refetch }) => {
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [updateTagging, updateTaggingResponse] = useMutation(UPDATE_TAGGING);

  const startEditing = () => setIsEditing(true);
  const endEditing = () => setIsEditing(false);

  const [desc, setDesc] = useState(tagging.description);
  const onSubmit = e => {
    e.preventDefault();
    updateTagging({ variables: { id: tagging.id, description: desc } })
      .then(refetch)
      .then(endEditing);
  };
  return (
    <>
      <div className="flex mb-4">
        <h3 className="text-lg text-gray-700">{title}</h3>
        <div className={classnames("inline-block ml-4")}>
          <Level tagging={tagging} colorClass={colorClass} />
        </div>
      </div>

      {isEditing && (
        <form onSubmit={onSubmit}>
          <div>
            <textarea
              className="border rounded bg-gray-200 p-4 w-full"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button className="btn shadow">Save</button>
          </div>
        </form>
      )}

      {!isEditing && (
        <div onClick={startEditing} className="text-gray-700">
          {tagging.description ? (
            tagging.description.split("\n").map(line => <div>{line}</div>)
          ) : (
            <span className="text-gray-500">
              +{" "}
              {tagging.on === "skills"
                ? "Add skill description (past experiences, projects,...)"
                : tagging.on === "motivations"
                ? "Add motivation description"
                : "Add description"}
            </span>
          )}
        </div>
      )}
    </>
  );
};

const PersonTag = ({ match, location, history }) => {
  const { id: personId, tag: tagName } = match.params;
  const { loading, error, data, refetch } = useQuery(GET_PERSON_WITH_TAGGINGS, {
    variables: { id: personId }
  });

  // eslint-disable-next-line no-unused-vars
  const [setTagOn, setTagOnResponse] = useMutation(SET_TAG_ON);

  if (loading) return <p className="card">Loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const motivations = data.person.taggings.filter(t => t.on === "motivations");
  const skills = data.person.taggings.filter(t => t.on === "skills");
  const motivation = motivations.filter(t => t.tag.name === tagName)[0];
  const skill = skills.filter(t => t.tag.name === tagName)[0];

  const addOn = on =>
    setTagOn({
      variables: {
        on,
        tagName,
        targetId: personId,
        targetType: "Person"
      }
    }).then(refetch);

  return (
    <div>
      <section className="card ">
        <h2 className="text-xl ">
          <Link className="border-b" to={`/persons/${personId}`}>
            {data.person.name}
          </Link>
          <div className="inline-block text-gray-600 w-8 text-center">:</div>
          <Link className="border-b" to={`/tags/${tagName}`}>
            {tagName}
          </Link>
        </h2>
      </section>

      <section className="card">
        {motivation && (
          <Tagging
            title="Motivation"
            tagging={motivation}
            colorClass="text-pink-500"
            refetch={refetch}
          />
        )}

        {skill && motivation && (
          <div className="my-8 border-gray-300 border-b" />
        )}

        {skill && (
          <Tagging
            title="Skill"
            tagging={skill}
            colorClass="text-blue-500"
            refetch={refetch}
          />
        )}
      </section>

      <div className="text-right mb-4 mr-6 md:mr-0">
        {!skill && (
          <button
            onClick={() => addOn("skills")}
            className="btn-transparent rounded bg-white shadow"
          >
            + Add <b className="text-blue-500">{tagName}</b> to{" "}
            {data.person.name} skills
          </button>
        )}
        {!motivation && (
          <button
            onClick={() => addOn("motivations")}
            className="btn-transparent rounded bg-white shadow"
          >
            + Add <b className="text-pink-500">{tagName}</b> to{" "}
            {data.person.name} motivations
          </button>
        )}
      </div>
    </div>
  );
};

export default withRouter(PersonTag);
