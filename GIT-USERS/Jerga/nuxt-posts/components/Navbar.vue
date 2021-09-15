<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="../">
          <img
            src="http://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
          />
        </a>
        <div
          @click="toggleIsActive"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        @click="toggleIsActive"
        id="navMenu"
        :class="{ 'is-active': isActive }"
        class="navbar-menu"
      >
        <div class="navbar-end">
          <div
            :class="{ 'is-active': isActive }"
            class="navbar-item has-dropdown"
          >
            <a class="navbar-link"> Menu </a>
            <div class="navbar-dropdown">
              <nuxt-link to="/" class="navbar-item"> Home </nuxt-link>
              <!-- <div @click="navigateTo('/manage')" class="navbar-item">
              Manage
              </div> -->
              <nuxt-link to="/manage" class="navbar-item"> Manage </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
      test1Var: "Some Test Value",
      test2Var: 23182,
      test3Var: () => {
        console.log("Calling test3Var");
        console.log(this.test2Var);
      },
      test4Var: true,
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    toggleIsActive() {
      this.isActive = !this.isActive;
      // this.test1()
      // console.log(this.test1Var)
      // console.log(this.test2Var)
      // console.log(this.test3Var)
      // console.log(this.test4Var)
    },
    test1() {
      console.log("calling test1 function");
      this.test1Var = "Changed Valued!";
      this.test2();
    },
    test2() {
      console.log("calling test2 function");
      this.test2Var = 123897213792137;
      this.test3();
    },
    test3() {
      console.log("calling test3 function");
      this.test3Var();
      this.test4Var = false;
    },
  },
};
</script>
