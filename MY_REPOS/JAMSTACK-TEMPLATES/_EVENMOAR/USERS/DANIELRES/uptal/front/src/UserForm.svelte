<script>
  import yup from 'yup';
  import Field from '/forms/Field.svelte';

  export let user;

  $: values && validate();
  $: isFormValid = !Object.keys(errors).length;

  const schema = yup.object().shape({
    userName: yup
      .string()
      .required('required')
      .min(3, 'Should be at least ${min} characters'),
    age: yup
      .number()
      .required('required')
      .min(18, 'You must be at least ${min} years old.')
      .typeError('invalid number')
  });

  let values = {};
  let errors = {};

  const validate = async () => {
    try {
      errors = {};
      const result = await schema.validate(values, { abortEarly: false });
      return result;
    } catch ({ inner }) {
      errors = inner.reduce(
        (acc, { path, message }) => ({ ...acc, [path]: message }),
        {}
      );
    }
  };

  const handleSubmit = async () => (user = await validate());
</script>

<div class="card border">
  <form on:submit|preventDefault={handleSubmit}>
    <Field
      class="mb-4"
      bind:value={values.userName}
      errors={errors.userName}
      placeholder="Please choose a username" />

    <Field
      class="mb-4"
      bind:value={values.age}
      errors={errors.age}
      placeholder="Your age?" />

    <button disabled={!isFormValid}>Submit</button>
  </form>
</div>
