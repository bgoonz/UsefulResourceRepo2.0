import { onMounted, ref, computed } from "vue";
import { fetchResources } from "@/actions";
import useSearch from "./useSearch";

export default function useResources() {
  const resources = ref([]);

  const getResources = async () => {
    resources.value = await fetchResources();
  };

  const hydrateResources = (resource, operation) => {
    const index = resources.value.findIndex((r) => r._id === resource._id);
    operation === "update"
      ? (resources.value[index] = resource)
      : resources.value.splice(index, 1);
  };

  onMounted(getResources);

  const resourcesLength = computed(() => resources.value.length);
  const hasResources = computed(() => resourcesLength.value > 0);

  // pass resources and returned searched ones
  const { searchedResources, setSearchQuery } = useSearch(resources);

  return {
    resources: searchedResources,
    getResources,
    resourcesLength,
    hasResources,
    hydrateResources,
    setSearchQuery,
  };
}
