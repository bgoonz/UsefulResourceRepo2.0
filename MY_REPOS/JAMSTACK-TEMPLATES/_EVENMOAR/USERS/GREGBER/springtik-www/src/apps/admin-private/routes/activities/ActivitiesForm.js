import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import connect from '~/modules/observo/connect';
import FormGroup from '~/modules/components/FormGroup';
import Form, {Input, Textarea, Select} from '~/modules/components/Form';
import Button from '~/modules/components/Button';
import Toolbar from '~/modules/components/Toolbar';
import styles from './activities.scss';
import ActivitiesEditor from './ActivitiesEditor';
import ActivitiesLocationControl from './ActivitiesLocationControl';
import ActivitiesPhotos from './ActivitiesPhotos';
import {formatLink} from '~/modules/activity/link';

const statusOptions = [
  {value: 'review', label: 'À relire'},
  {value: 'published', label: 'Publiée'},
];

export const ActivitiesForm = ({
  onSubmit,
  onDelete,
  onActivityChange,
  result,
  deleteResult,
  activity,
  categories,
  disabled,
}) => (
  <Form
    model={activity}
    onModelChange={onActivityChange}
    onSubmit={onSubmit}
  >
    <div className={styles['form-section-fields']}>
      <FormGroup className={styles['form-group-small']}>
        <Input
          autoFocus={!activity.id}
          name="name"
          placeholder="Titre de l'activité"
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Input
          name="slug"
          maxLength={255}
          pattern="[a-z0-9-]+"
          disabled={disabled}
          placeholder="Slug"
        />
        <span className={styles.slugPreview}>
          springtik.fr
          {
            formatLink({
              id: activity.id || '???',
              city: activity.city || '???',
              category: (
                categories
                  .find(({id}) => activity.categoryId === id) || {}
              ).name || '???',
              slug: activity.slug || '???',
            })
          }
        </span>
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Select
          name="status"
          placeholder="Status"
          options={statusOptions}
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Textarea
          counter
          name="description"
          maxLength={180}
          rows={4}
          placeholder="Description courte"
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Select
          name="categoryId"
          placeholder="Catégorie"
          options={categories && categories.map(({id, name}) =>
            ({value: id, label: name})
          )}
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <ActivitiesLocationControl
          name="location"
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Input
          name="address"
          maxLength={255}
          placeholder="Adresse"
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Input
          name="zipcode"
          maxLength={5}
          placeholder="Code postal"
          pattern="[0-9]{5}"
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Input
          name="city"
          maxLength={50}
          placeholder="Ville"
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Input
          name="phoneNumber"
          maxLength={255}
          pattern="[0-9]{10}"
          placeholder="Numéro de téléphone"
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Input
          name="website"
          maxLength={255}
          placeholder="Site internet"
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <ActivitiesEditor text={activity.text} {...{disabled}} />
      </FormGroup>
      {activity.id ? (
        <FormGroup>
          <ActivitiesPhotos pictures={activity.pictures || []} activityId={activity.id} />
        </FormGroup>
      ) : null}
    </div>
    <Toolbar className={styles['form-section-toolbar']}>
      <Button
        small
        disabled={result.progress || disabled}
      >
        {activity.id ? 'Mettre à jour' : 'Créer'}
      </Button>
      {activity.id ? (
        <Button
          small
          type="button"
          uiStyle="danger"
          onClick={onDelete}
          disabled={deleteResult.progress || disabled}
        >
          <i className="fa fa-trash" />Supprimer
        </Button>
      ) : null}
    </Toolbar>
  </Form>
);

ActivitiesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onActivityChange: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  deleteResult: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  })).isRequired,
  disabled: PropTypes.bool,
};

ActivitiesForm.defaultProps = {
  activity: {
    address: '',
    slug: '',
    categoryId: null,
    city: '',
    description: '',
    name: '',
    status: '',
    text: '',
    zipcode: '',
    website: '',
    phoneNumber: '',
  },
  deleteResult: {},
};

export default compose(
  connect(({
    categories$,
  }) => ({
    categories: categories$,
  })),
  withStyles(styles)
)(ActivitiesForm);
