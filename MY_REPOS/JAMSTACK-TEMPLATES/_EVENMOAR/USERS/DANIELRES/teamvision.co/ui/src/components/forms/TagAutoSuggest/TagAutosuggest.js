import PropTypes from "prop-types";
import React from "react";
import Autosuggest from "react-autosuggest";

const getSuggestionValue = suggestion => suggestion.name;

const Highlighter = ({ str, substr }) => {
  const parts = str.split(new RegExp(`(${substr})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === substr.toLowerCase() ? (
          <span key={`${part}-${i}`} className="highlighted">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const renderSuggestion = (suggestion, { query }) => (
  <div className={suggestion.isNew ? "new" : ""}>
    {suggestion.isNew ? (
      suggestion.name
    ) : (
      <Highlighter str={suggestion.name} substr={query} />
    )}
  </div>
);

class TagAutoSuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => this.setState({ value: newValue });

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: this.props.getSuggestions(value) });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  onSuggestionSelected = e => {
    const tagName = e.target.value
      ? e.target.value // set when using ENTER
      : e.target.innerText; // set when clicking on the suggestion

    this.props
      .setTagOn({
        variables: {
          tagName,
          on: this.props.on,
          targetType: this.props.type,
          targetId: this.props.id
        }
      })
      .then(this.props.onSuccess)
      .then(() => this.setState({ value: "" }));
  };

  render() {
    const { value, suggestions } = this.state;
    const { on } = this.props;

    const inputProps = {
      onChange: this.onChange,
      placeholder: `+ Add ${on}`,
      value
    };

    return (
      <div className={on}>
        <Autosuggest
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestion={renderSuggestion}
        />
      </div>
    );
  }
}

TagAutoSuggest.propTypes = {
  getSuggestions: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  on: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setTagOn: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default TagAutoSuggest;
