<template>
  <div id="phoneInput" class="phone-input-wrapper" v-click-outside="closeDrop">
    <div class="country-select" @click="toggleDropDown()">
      <div class="flag-wrapper">
        <span class="flag">{{flag}}</span>
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
      @blur="$emit('blur')"
      v-model="inputValue"
    />

    <ul v-show="showOption" class="countries-dropdown">
      <span class="search-container">
        <input v-model="searchKey" type="text" class="search-input" />
      </span>
      <div>
        <li
          :class="{
            'd-none': searchString(country.name)
          }"
          v-for="country in this.$emojiFlags.data"
          :key="country.code"
          :value="country.code"
          @click="onClickFlag(country.code)"
        >
          <span class="flag">{{country.emoji}}</span>
          <span>{{ country.name }} </span>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      countriesByCode: this.$emojiFlags.data.reduce(function(result, country) {
        result[country.code] = country;
        return result;
      }, {}),
      flag: "",
      dialCode: "",
      inputValue: "",
      phoneNumber: "",
      showOption: false,
      searchKey: ""
    };
  },
  watch: {
    dialCode: function(val) {
      this.inputValue = `${val} `;
    },
    inputValue: function(val) {
      let formattedValue = val.replace(/[^0-9\+\-\s]/g, "");
      console.log(formattedValue)
      if (!formattedValue.startsWith(`${this.dialCode} `))
        formattedValue = this.phoneNumber;
      this.phoneNumber = this.inputValue = formattedValue;
      this.$emit("phoneInput", {
        phone: this.phoneNumber
          .trim()
          .split(" ")
          .join(""),
        dialCode: this.dialCode
      });
    }
  },
  methods: {
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
      this.flag = this.$emojiFlags.countryCode(code).emoji
      this.dialCode = this.countriesByCode[code].dialCode;
      this.showOption = false;
    },
    toggleDropDown() {
      const oldOption = !this.showOption;
      this.showOption = oldOption;
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
    this.flag = this.$emojiFlags.countryCode(this.locale).emoji
    this.dialCode = this.countriesByCode[this.locale].dialCode;
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/phone-input.scss";
</style>
