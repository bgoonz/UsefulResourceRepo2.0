export default {
  data() {
    return {
      alert: this.initAlert(),
      timeoutId: null,
    };
  },
  methods: {
    initAlert() {
      return { success: null, error: null };
    },
    clearAlertTimeout() {
      this.timeoutId && clearTimeout(this.timeoutId);
    },
    setAlert(type, message) {
      this.alert = this.initAlert();
      this.alert[type] = message;
      this.timeoutId = setTimeout(() => (this.alert = this.initAlert()), 2000);
    },
  },
};
