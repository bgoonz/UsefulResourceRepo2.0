<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-body>
        <nb-title> Register </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-input placeholder="Username" auto-capitalize="none" />
        </nb-item>
        <nb-item>
          <nb-input placeholder="Full Name" auto-capitalize="none" />
        </nb-item>
        <nb-item>
          <nb-input placeholder="Email" auto-capitalize="none" />
        </nb-item>
        <nb-item>
          <nb-input placeholder="Avatar Url" auto-capitalize="none" />
        </nb-item>
        <nb-item>
          <nb-input
            placeholder="Password"
            auto-capitalize="none"
            secure-text-entry
          />
        </nb-item>
        <nb-item>
          <nb-input
            last
            placeholder="Password Confirmation"
            auto-capitalize="none"
          />
        </nb-item>
      </nb-form>
      <view :style="{ marginTop: 10 }">
        <nb-button block>
          <nb-text>Register</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>
