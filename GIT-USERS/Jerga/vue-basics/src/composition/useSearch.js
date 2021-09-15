import { computed, ref } from "vue";

export default function useSearch(resources) {
  const searchQuery = ref("");

  const setSearchQuery = (value) => (searchQuery.value = value);

  const searchedResources = computed(() => {
    if (!searchQuery.value) {
      return resources.value;
    }

    const lcSearch = searchQuery.value.toLocaleLowerCase();

    return resources.value.filter((resource) => {
      const lcTitle = resource.title.toLocaleLowerCase();
      return lcTitle.includes(lcSearch);
    });
  });

  return {
    searchedResources,
    setSearchQuery,
  };
}
