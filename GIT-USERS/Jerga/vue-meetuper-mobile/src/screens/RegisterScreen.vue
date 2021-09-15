<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-body>
        <nb-title> Register </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <InputWithError
          :error="$v.form.username.$dirty && !$v.form.username.minLength"
          msg="Minimum length is 8 characters!"
        >
          <nb-input
            v-model="form.username"
            placeholder="Username"
            auto-capitalize="none"
            :on-blur="() => $v.form.username.$touch()"
          />
        </InputWithError>
        <nb-item>
          <nb-input
            v-model="form.name"
            placeholder="Full Name"
            auto-capitalize="none"
          />
        </nb-item>
        <InputWithError
          :error="$v.form.email.$dirty && !$v.form.email.validEmail"
          msg="Email format is not valid!"
        >
          <nb-input
            v-model="form.email"
            placeholder="Email"
            auto-capitalize="none"
            :on-blur="() => $v.form.email.$touch()"
          />
        </InputWithError>
        <nb-item>
          <nb-input
            v-model="form.avatar"
            placeholder="Avatar Url"
            auto-capitalize="none"
          />
        </nb-item>
        <InputWithError
          :error="$v.form.password.$dirty && !$v.form.password.required"
          msg="Password is required!"
        >
          <nb-input
            v-model="form.password"
            placeholder="Password"
            auto-capitalize="none"
            secure-text-entry
            :on-blur="() => $v.form.password.$touch()"
          />
        </InputWithError>
        <InputWithError
          :error="
            $v.form.passwordConfirmation.$dirty &&
            !$v.form.passwordConfirmation.sameAsPassword
          "
          msg="Password confirmation needs to be same as password!"
        >
          <nb-input
            v-model="form.passwordConfirmation"
            last
            placeholder="Password Confirmation"
            secure-text-entry
            auto-capitalize="none"
            :on-blur="() => $v.form.passwordConfirmation.$touch()"
          />
        </InputWithError>
      </nb-form>
      <view :style="{ marginTop: 10 }">
        <nb-button :on-press="register" block>
          <nb-text>Register</nb-text>
        </nb-button>
      </view>
      <nb-button transparent :on-press="goToLogin">
        <nb-text>Already Registered? You can login here.</nb-text>
      </nb-button>
    </nb-content>
  </nb-container>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { Toast } from "native-base";
export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        username: "",
        name: "",
        avatar: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        validEmail: email,
      },
      password: {
        required,
      },
      passwordConfirmation: {
        sameAsPassword: sameAs("password"),
      },
      username: {
        minLength: minLength(8),
      },
    },
  },
  methods: {
    register() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store
          .dispatch("auth/register", this.form)
          .then(() => this.navigateToLogin())
          .catch(() => {
            Toast.show({
              text: "Ooops, something went wrong",
              buttonText: "Okay",
              type: "danger",
              duration: 3000,
            });
          });
      }
    },
    goToLogin() {
      this.navigation.navigate("Login");
    },
    navigateToLogin() {
      this.navigation.navigate("Login", {
        message: "You have been succesfuly registered. You can login now (:",
      });
    },
  },
};
</script>
