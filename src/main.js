// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import YellowcardPhoneInput from "./components/PhoneInput";
var emojiFlags = require('emoji-flags');

Vue.config.productionTip = false;

Vue.prototype.$emojiFlags = emojiFlags;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { YellowcardPhoneInput },
  template: "<YellowcardPhoneInput/>"
});
