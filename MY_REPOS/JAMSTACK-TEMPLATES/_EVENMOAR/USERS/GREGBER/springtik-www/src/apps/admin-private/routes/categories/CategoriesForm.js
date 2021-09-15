import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import connect from '~/modules/observo/connect';
import FormGroup from '~/modules/components/FormGroup';
import Form, {Input, Select, Textarea} from '~/modules/components/Form';
import Button from '~/modules/components/Button';
import Toolbar from '~/modules/components/Toolbar';
import styles from './categories.scss';

const levelOptions = [
  {value: 1, label: 'Premier niveau'},
  {value: 2, label: 'Second niveau'},
];

export const CategoriesForm = ({
  onSubmit,
  onDelete,
  onCategoryChange,
  result,
  deleteResult,
  category,
  categories,
  disabled,
  keywords,
}) => (
  <Form
    model={category}
    onModelChange={onCategoryChange}
    onSubmit={onSubmit}
  >
    <div className={styles['form-section-fields']}>
      <FormGroup className={styles['form-group-small']}>
        <Input
          autoFocus={!category.id}
          name="name"
          placeholder="Titre de la catégorie"
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup className={styles['form-group-small']}>
        <Select
          name="level"
          placeholder="Niveau de la catégorie"
          options={levelOptions}
          disabled={disabled || Boolean(category.id)}
          required
        />
      </FormGroup>
      {category.level === 2 ? (
        <FormGroup className={styles['form-group-small']}>
          <Select
            name="parentId"
            placeholder="Catégorie parente"
            options={
              categories
                .filter(({level}) => level === 1)
                .map(({id, name}) => ({value: id, label: name}))
            }
            disabled={disabled}
            required
          />
        </FormGroup>
      ) : null}
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
          multi
          allowCreate
          name="keywords"
          placeholder="Mots clefs"
          options={keywords && keywords.map(value => ({value, label: value}))}
          disabled={disabled}
        />
      </FormGroup>
    </div>
    <Toolbar className={styles['form-section-toolbar']}>
      <Button
        small
        disabled={result.progress || disabled}
      >
        {category.id ? 'Mettre à jour' : 'Créer'}
      </Button>
      {category.id ? (
        <Button
          small
          type="button"
          uiStyle="danger"
          onClick={onDelete}
          disabled={deleteResult.progress || disabled}
        >
          Supprimer
        </Button>
      ) : null}
    </Toolbar>
  </Form>
);

CategoriesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onCategoryChange: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  deleteResult: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  })).isRequired,
  disabled: PropTypes.bool,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

CategoriesForm.defaultProps = {
  category: {
    name: '',
    level: null,
    description: '',
    keywords: [],
  },
  deleteResult: {},
};

export default compose(
  connect(({
    categories$,
    keywords$,
  }) => ({
    categories: categories$,
    keywords: keywords$,
  })),
  withStyles(styles)
)(CategoriesForm);
