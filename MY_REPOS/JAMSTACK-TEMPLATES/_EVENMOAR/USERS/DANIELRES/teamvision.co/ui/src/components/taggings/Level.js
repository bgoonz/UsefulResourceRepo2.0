import { useMutation, useQuery } from "@apollo/react-hooks";
import classnames from "classnames";
import React, { useRef, useState } from "react";
import { GET_TAG_TREE_DATA, UPDATE_TAGGING } from "../../gql/tags";
import useOnOutsideClick from "../../utils/useOnOutsideClick";

const LEVELS = [0, 20, 40, 60, 80, 100];

const getText = tagging => {
  if (!tagging || tagging.level === null) return "—";
  return Array.from({ length: Math.floor(tagging.level / 20) })
    .map(() => "▮")
    .join("")
    .padEnd(5, "▯");
};

const c = {
  button: "block w-full text-left text-gray-500 hover:bg-yellow-200 px-4 py-1"
};

const Level = ({ colorClass, tagging }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const ref = useRef(null);
  useOnOutsideClick(ref, close);

  const [updateTagging, response] = useMutation(UPDATE_TAGGING);
  const { refetch } = useQuery(GET_TAG_TREE_DATA);

  const setLevel = level => {
    close();
    updateTagging({
      variables: { id: tagging.id, level }
    }).then(refetch);
  };

  if (isOpen)
    return (
      <div className="shadow-md rounded bg-white absolute z-50" ref={ref}>
        <button
          className={classnames(c.button, {
            [colorClass]: !(tagging && tagging.level)
          })}
          onClick={() => setLevel(null)}
        >
          —
        </button>

        {LEVELS.map(level => (
          <button
            className={classnames(c.button, {
              [colorClass]:
                tagging &&
                Object.keys(tagging).includes("level") &&
                Math.round(tagging.level / 20) * 20 === level
            })}
            onClick={() => setLevel(level)}
            key={level}
          >
            {"".padEnd(Math.floor(level / 20), "▮").padEnd(5, "▯")}
          </button>
        ))}
      </div>
    );

  return (
    <div
      className={classnames(
        "relative",
        tagging && Object.keys(tagging).includes("level")
          ? colorClass
          : "text-gray-500"
      )}
      onClick={toggleIsOpen}
    >
      {!response.loading && getText(tagging)}
    </div>
  );
};

export default Level;
