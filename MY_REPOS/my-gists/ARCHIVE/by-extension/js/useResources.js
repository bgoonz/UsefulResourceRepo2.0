export default function useResources() {
  const resources = ref([]);
  const getResources = async () => (resources.value = await fetchResources());

  onMounted(getResources);

  const resourceCount = computed(() => resources.value.length);
  const hasResources = computed(() => resourceCount.value > 0);

  const { searchedResources, setSearchQuery } = useSearchResources(resources);

  return {
    resources: searchedResources,
    resourceCount,
    hasResources,
    setSearchQuery,
  };
}
