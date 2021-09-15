<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-body>
        <nb-title> Login </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-input placeholder="Email" auto-capitalize="none" />
        </nb-item>
        <nb-item last>
          <nb-input
            placeholder="Password"
            auto-capitalize="none"
            secure-text-entry
          />
        </nb-item>
      </nb-form>
      <view :style="{ marginTop: 10 }">
        <nb-button block>
          <nb-text>Login </nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>
