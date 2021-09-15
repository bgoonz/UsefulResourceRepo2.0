<nuxt-link
  v-if="listing.cover"
  :to="'/listing/' + listing.id + '/' + listing.slug"
  class="image-wrapper background-image"
  alt=""
>
  <img :src="listing.cover.thumbnail" alt="" style="width:100%!important">
</nuxt-link>
<nuxt-link
  v-else
  :to="'/listing/' + listing.id + '/' + listing.slug"
  class="image-wrapper background-image"
  alt=""
>
  <img src="https://s3-ap-southeast-1.amazonaws.com/push-singapore/accounts/75/photo//5c6a489b-31ec-460e-9cbb-23920a820e9b.jpg" alt="" style="width:100%!important">
</nuxt-link>
