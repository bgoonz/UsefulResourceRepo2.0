import { useMutation, useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { default as React } from "react";
import { GET_TAG_TREE_DATA, SET_TAG_ON } from "../../../gql/tags";
import { upperFirst } from "../../../utils/strings";
import TagAutosuggest from "./TagAutosuggest";

const TagAutosuggestContainer = ({ id, type, on, onSuccess }) => {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_TAG_TREE_DATA);
  // eslint-disable-next-line no-unused-vars
  const [setTagOn, setTagOnResponse] = useMutation(SET_TAG_ON);

  if (loading) return <p>Loading...</p>;

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const suggestions = data.tagTreeData.tags.all.map(tagName => ({
      name: tagName
    }));

    const filtered = suggestions.filter(
      // shows first suggestions starting with inputValue
      // then suggestions containing query at any position
      item =>
        item.name.toLowerCase().slice(0, inputLength) === inputValue ||
        item.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const withNew = [
      ...filtered,
      { name: upperFirst(inputValue), isNew: true }
    ];

    return filtered
      .map(e => e.name.toLowerCase())
      .includes(inputValue.toLowerCase()) || inputLength < 2
      ? filtered
      : withNew;
  };

  return (
    <TagAutosuggest
      getSuggestions={getSuggestions}
      setTagOn={setTagOn}
      id={id}
      on={on}
      onSuccess={onSuccess}
      type={type}
    />
  );
};

TagAutosuggestContainer.propTypes = {
  id: PropTypes.string.isRequired,
  on: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default TagAutosuggestContainer;
