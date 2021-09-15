<template>
  <nb-container>
    <nb-content>
      <!-- Iterate Threads -->
      <view>
        <nb-list-item avatar>
          <nb-left>
            <!-- Thread User Avatar -->
            <nb-thumbnail small />
          </nb-left>
          <nb-body>
            <!-- Thread User Name -->
            <nb-text>Felipe</nb-text>
            <!-- Thread Title -->
            <nb-text note :numberOfLines="1">Some Title</nb-text>
          </nb-body>
          <nb-right>
            <!-- Thread Date -->
            <nb-text note>Some Date</nb-text>
          </nb-right>
        </nb-list-item>
        <!-- Iterate Posts Here -->
        <view class="post-container">
          <nb-list-item avatar>
            <nb-left>
              <!-- Post User Avatar -->
              <nb-thumbnail small />
            </nb-left>
            <nb-body>
              <!-- Post User Name -->
              <nb-text>Filipe</nb-text>
              <!-- Post Text -->
              <nb-text note>Some Text</nb-text>
            </nb-body>
            <nb-right>
              <nb-text note>Some Date</nb-text>
            </nb-right>
          </nb-list-item>
        </view>
      </view>
    </nb-content>
  </nb-container>
</template>

<style>
.post-container {
  padding-right: 20px;
  padding-left: 20px;
}
</style>
