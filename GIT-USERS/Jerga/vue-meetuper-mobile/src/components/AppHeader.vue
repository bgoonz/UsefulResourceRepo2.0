<template>
  <nb-header>
    <nb-left>
      <nb-button :on-press="goBack" v-if="!root" transparent>
        <nb-icon name="arrow-back" />
      </nb-button>
    </nb-left>
    <nb-body>
      <nb-title>{{ screen }}</nb-title>
    </nb-body>
    <nb-right>
      <nb-button :on-press="displayActionsheet" transparent>
        <nb-icon name="menu" />
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script>
import { ActionSheet } from "native-base";
export default {
  props: {
    screen: {
      type: String,
      default: "Header",
    },
    root: {
      type: Boolean,
    },
    navigation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    optionCancelIndex() {
      return this.btnOptions.length - 1;
    },
    optionDestructiveIndex() {
      return this.isAuth ? this.optionCancelIndex - 1 : -99;
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    btnOptions() {
      if (this.isAuth) {
        return ["Create Meetup", "Logout", "Cancel"];
      } else {
        return ["Login", "Register", "Cancel"];
      }
    },
  },
  methods: {
    displayActionsheet() {
      ActionSheet.show(
        {
          options: this.btnOptions,
          cancelButtonIndex: this.optionCancelIndex,
          destructiveButtonIndex: this.optionDestructiveIndex,
          title: "Select An Option",
        },
        this.handleOptionSelect
      );
    },
    handleOptionSelect(buttonIndex) {
      const option = this.btnOptions[buttonIndex];

      switch (option) {
        case "Login":
          this.navigation.navigate("Login");
          break;
        case "Register":
          this.navigation.navigate("Register");
          break;
        case "Create Meetup":
          this.navigation.navigate("MeetupCreate");
          break;
        case "Logout":
          this.$store.dispatch("auth/logout").then(() => {
            this.navigation.navigate("Home");
          });
          break;
        default:
          return null;
      }
    },
    goBack() {
      this.navigation.goBack();
    },
  },
};
</script>
