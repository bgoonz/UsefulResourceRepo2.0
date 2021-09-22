<template v-if="status">
  <select
    class="
      block
      appearance-none
      w-full
      bg-gray-200
      border border-gray-200
      text-gray-700
      py-3
      px-4
      pr-8
      rounded
      leading-tight
      focus:outline-none focus:bg-white focus:border-gray-500
    "
    :class="[error ? 'border-red-600 focus:border-red-600' : '']"
    :value="value"
    @change="change"
  >
    <option value="default">Change Status</option>
    <option value="active">Active</option>
    <option value="published">Published</option>
  </select>
</template>
<template v-else>
  <select
    class="
      block
      appearance-none
      w-full
      bg-gray-200
      border border-gray-200
      text-gray-700
      py-3
      px-4
      pr-8
      rounded
      leading-tight
      focus:outline-none focus:bg-white focus:border-gray-500
    "
    :class="[error ? 'border-red-600 focus:border-red-600' : '']"
  >
    <option value="default">Select Category</option>
    <option
      v-for="option in options"
      :key="option._id"
      :value="option.name"
      :selected="selectedOption(option)"
    >
      {‌{ option.name }}
    </option>
  </select>
</template>
