import React, {Component, PropTypes} from 'react';
import compose from 'recompose/compose';
import placesApi from '~/apps/admin-private/placesApi';
import {inForm} from '~/modules/components/Form';
import Select from '~/modules/components/Select';
import Input from '~/modules/components/Input';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivitiesLocationControl.scss';
import detailsToModel from './detailsToModel';

const getLocationOptions = input => {
  if (!input)
    return Promise.resolve({
      options: [],
      complete: false,
    });

  return placesApi.autocomplete({input})
    .then(results => {
      const options = results
        ? placesApi.formatAutocompleteResults(results)
            .map(result => {
              const value = {
                ...result,
                toString() {
                  return this.place_id;
                },
              };

              return {
                label: result.description,
                value,
              };
            })
        : [];

      return {
        options,
        complete: false,
      };
    });
};

const filterLocationOption = () => true;
const locationValueRenderer = ({description}) => description;

export class ActivitiesLocationControl extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
  };

  static defaultProps = {
    value: null,
  };

  state = {
    progress: false,
  };

  handleChange = ({place_id}) => {
    this.setState({progress: true});

    placesApi.details({placeId: place_id})
      .then(details => {
        this.setState({progress: false});
        this.props.onChange(detailsToModel(details));
      })
      .catch(() => {
        this.setState({progress: false});
        this.props.onChange(null);
      });
  };

  handleClear = event => {
    event.preventDefault();
    this.props.onChange(null);
  };

  render() {
    const {disabled, value} = this.props;
    const {progress} = this.state;

    return (
      <div>
        {progress || value ? [
          <Input
            key="input"
            name={this.props.name}
            value={value ? `${value.name} (${value.formatted_address})` : 'Chargement...'}
            readOnly
          />,
          <a
            key="clear"
            href="#"
            onClick={this.handleClear}
            className={styles.clearBtn}
          >
            <i className="fa fa-times" />
          </a>,
        ] : (
          <Select
            name={this.props.name}
            placeholder="Localisation"
            autoload={false}
            asyncOptions={getLocationOptions}
            disabled={disabled}
            filterOption={filterLocationOption}
            valueRenderer={locationValueRenderer}
            onChange={this.handleChange}
            required={this.props.required}
          />
        )}
      </div>
    );
  }
}

export default compose(
  inForm({extractValueFromOnChange: value => value}),
  withStyles(styles)
)(ActivitiesLocationControl);
