<template>
  <div
    id="phoneInput"
    class="phone-input-wrapper"
    :class="{ error: isError }"
    v-click-outside="closeDrop"
  >
    <div class="country-select" @click="toggleDropDown()">
      <div class="flag-wrapper">
        <span class="flag">{{ flag }}</span>
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
      @blur="blurred"
      v-model="inputValue"
    />

    <ul v-show="showOption" class="countries-dropdown">
      <span class="search-container">
        <input
          v-model="searchKey"
          type="text"
          ref="search"
          class="search-input"
        />
      </span>
      <div>
        <li
          :class="{
            'd-none': searchString(country.name)
          }"
          v-for="country in emojiFlags.data"
          :key="country.code"
          :value="country.code"
          @click="onClickFlag(country.code)"
        >
          <span class="flag">{{ country.emoji }}</span>
          <span>{{ country.name }} </span>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
var emojiFlags = require("emoji-flags");
var PhoneNumber = require("awesome-phonenumber");
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
    }
  },
  data() {
    return {
      countriesByCode: emojiFlags.data.reduce(function(result, country) {
        result[country.code] = country;
        return result;
      }, {}),
      flag: "",
      dialCode: "",
      inputValue: "",
      phoneNumber: "",
      isError: false,
      showOption: false,
      searchKey: "",
      emojiFlags: emojiFlags
    };
  },
  watch: {
    dialCode: function(val) {
      this.inputValue = `${val} `;
    },
    inputValue: function(val) {
      let formattedValue = val.replace(/[^0-9\+\-\s]/g, "");
      if (!formattedValue.startsWith(`${this.dialCode} `))
        formattedValue = this.phoneNumber;
      this.phoneNumber = this.inputValue = formattedValue;
      let pn = new PhoneNumber(val).a;
      console.log(pn);
      if (pn.number.e164) {
        this.$emit("phoneInput", {
          phone: pn.number.e164,
          callingCode: this.dialCode.substring(1),
          isValid: pn.valid
        });
      } else {
        this.$emit("phoneInput", {
          phone: pn.number.input,
          callingCode: this.dialCode.substring(1),
          isValid: pn.valid
        });
      }

      if (pn.valid) {
        this.isError = false;
      }
    }
  },
  methods: {
    blurred() {
      this.$emit("blur");
      this.isError = !new PhoneNumber(this.inputValue).a.valid;
    },
    searchString(name = "") {
      if (this.searchKey.trim()) {
        name = this.prepString(name);
        const searchKey = this.prepString(this.searchKey);

        return !name.includes(searchKey);
      } else return false;
    },
    prepString(x) {
      return x
        .trim()
        .split(" ")
        .join("")
        .toLocaleLowerCase();
    },
    onClickFlag(code) {
      this.flag = this.countriesByCode[code].emoji;
      this.dialCode = this.countriesByCode[code].dialCode;
      this.showOption = false;
    },
    toggleDropDown() {
      const oldOption = !this.showOption;
      this.showOption = oldOption;
      this.$nextTick(() => {
        this.$refs.search.focus();
      });
    },
    closeDrop(event) {
      this.showOption = false;
    },
    async fetchCountry() {
      const data = await fetch(
        "https://ipapi.co/json/?key=l4HNjGbqprIaNgbt9vQQfblxrAvC3dh4J3B8IwrphiJklNnYu5"
      ).then(r => r.json());
      const code = data.country;
      this.flag = this.countriesByCode[code].emoji;
      this.dialCode = this.countriesByCode[code].dialCode;
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
    this.flag = this.countriesByCode[this.locale].emoji;
    this.dialCode = this.countriesByCode[this.locale].dialCode;
  },
  async mounted() {
    await this.fetchCountry();
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/phone-input.scss";
</style>
