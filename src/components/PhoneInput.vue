<template>
  <div id="phoneInput" class="phone-input-wrapper" v-click-outside="closeDrop">
    <div class="country-select" @click="toggleDropDown()">
      <div class="flag-wrapper">
        <img v-bind:src="flagUrl" class="flag" />
        <div class="caret">
          <div class="right-slash"></div>
          <div class="left-slash"></div>
        </div>
      </div>
    </div>

    <input
      type="tel"
      placeholder="Phone number"
      maxlength="18"
      class="phone-input"
      v-model="inputValue"
    />

    <ul v-show="showOption" class="countries-dropdown">
      <li
        v-for="country in countries"
        :key="country.alpha2Code"
        :value="country.alpha2Code"
        @click="onClickFlag(country.alpha2Code)"
      >
        <img :src="country.flag" />
        <span> {{ country.name }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
import countriesData from "../countries.json";

export default {
  name: "YellowcardPhoneInput",
  props: {
    initialValue: {
      type: String,
      default: ""
    },
    locale: {
      type: String,
      default: "NG"
    },
    countries: {
      type: Array,
      default: () => countriesData
    }
  },
  data() {
    return {
      countriesByCode: this.countries.reduce(function(result, country) {
        result[country.alpha2Code] = country;
        return result;
      }, {}),
      flagUrl: "",
      countryCode: "",
      inputValue: "",
      phoneNumber: "",
      showOption: false
    };
  },
  watch: {
    countryCode: function(val) {
      this.inputValue = `+${val} `;
    },
    inputValue: function(val) {
      let formattedValue = val.replace(/[^0-9\+\-\s]/g, "");
      if (!formattedValue.startsWith(`+${this.countryCode} `))
        formattedValue = this.phoneNumber;
      this.phoneNumber = this.inputValue = formattedValue;
      this.$emit("phoneInput", {
        phone: this.phoneNumber
          .trim()
          .split(" ")
          .join(""),
        countryCode: this.countryCode
      });
    }
  },
  methods: {
    onClickFlag(code) {
      this.flagUrl = this.countriesByCode[code].flag;
      this.countryCode = this.countriesByCode[code].callingCodes[0];
      this.showOption = false;
    },
    toggleDropDown() {
      const oldOption = !this.showOption;
      this.showOption = oldOption;
    },
    async fetchCountry() {
      const data = await fetch("https://ipapi.co/json/").then(r => r.json());
      const code = data.country;
      this.flagUrl = this.countriesByCode[code].flag;
      this.countryCode = this.countriesByCode[code].callingCodes[0];
    },
    closeDrop(event) {
      this.showOption = false;
    }
  },
  directives: {
    "click-outside": {
      bind(el, binding, vnode) {
        var vm = vnode.context;
        var callback = binding.value;

        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            return callback.call(vm, event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  },
  created() {
    this.flagUrl = this.countriesByCode[this.locale].flag;
    this.countryCode = this.countriesByCode[this.locale].callingCodes[0];
  },
  async mounted() {
    await this.fetchCountry();
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/phone-input.scss";
</style>
