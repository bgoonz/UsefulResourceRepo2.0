import { ref, computed } from "vue";

export default function useSearchResource(resources) {
  const searchQuery = ref("");

  const setSearchQuery = (searched) => {
    searchQuery.value = searched;
  };

  const searchedResources = computed(() => {
    if (!searchQuery.value) {
      return resources.value;
    }

    const lcSearch = searchQuery.value.toLocaleLowerCase();

    return resources.value.filter((r) => {
      const title = r?.title.toLocaleLowerCase();
      return title.includes(lcSearch);
    });
  });

  return {
    setSearchQuery,
    searchedResources,
  };
}
