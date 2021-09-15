<Suspense>
  <template #default>
    <UserPanel/>
  </template>
  <template #fallback>
    Loading user ...
  </template>
</Suspense>
