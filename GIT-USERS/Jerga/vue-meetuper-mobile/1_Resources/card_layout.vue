<nb-text class="header-1">Featured Meetups</nb-text>
<!-- Iterate meetups "v-for"  -->
<nb-card>
  <nb-card-item bordered>
    <nb-left>
      <nb-thumbnail :source="{uri: ''}"></nb-thumbnail>
      <nb-body>
        <nb-text>Some title</nb-text>
        <nb-text note>Start Date</nb-text>
      </nb-body>
    </nb-left>
  </nb-card-item>
  <nb-card-item>
    <nb-body>
      <image :source="{uri: ''}" class="card-item-image"/>
      <nb-text>Some Description</nb-text>
    </nb-body>
  </nb-card-item>
  <nb-card-item :style="{ paddingVertical: 0 }">
    <nb-left>
      <nb-button transparent>
        <nb-icon name="person"></nb-icon>
        <nb-text>2 people are comming</nb-text>
      </nb-button>
    </nb-left>
  </nb-card-item>
</nb-card>
