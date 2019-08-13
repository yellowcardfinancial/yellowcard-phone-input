<template>
  <div class="phone-input-wrapper">

    <div class="country-select">

      <select class="countries" @change="onSelectChange($event)">
        <option
          v-for="country in countries"
          :key="country.alpha2Code"
          :value="country.alpha2Code">
          {{ country.name }}
        </option>
      </select>

      <div class="flag-wrapper">
        <img v-bind:src="flagUrl" class="flag">
        <img src="../assets/arrow-down.svg" class="caret">
      </div>

    </div>

    <input type="tel" placeholder="Phone number" class="phone-input" v-model="inputValue"/>

  </div>
</template>

<script>
import countriesData from '../countries.json';

export default {
  name: 'YellowcardPhoneInput',
  props: {
    initialValue: {
      type: String,
      default: ''
    },
    locale: {
      type: String,
      default: 'NG'
    },
    countries: {
      type: Array,
      default: () => countriesData
    }
  },
  data () {
    return {
      countriesByCode: this.countries.reduce(function (result, country) {
        result[country.alpha2Code] = country;
        return result;
      }, {}),
      flagUrl: '',
      countryCode: '',
      inputValue: '',
      phoneNumber: ''
    }
  },
  watch: {
    countryCode: function(val) {
      this.inputValue = `+${ val } `
    },
    inputValue: function(val) {
      let formattedValue = val.replace(/[^0-9\+\-\s]/g, '');
      if(!formattedValue.startsWith(`+${ this.countryCode } `)) formattedValue = this.phoneNumber;
      this.phoneNumber = this.inputValue = formattedValue;
    }
  },
  methods: {
    onSelectChange(event) {
      const code = event.target.value
      this.flagUrl = this.countriesByCode[code].flag
      this.countryCode = this.countriesByCode[code].callingCodes[0]
    }
  },
  created () {
    this.flagUrl = this.countriesByCode[this.locale].flag
    this.countryCode = this.countriesByCode[this.locale].callingCodes[0]
  }
}
</script>


<style lang="scss" scoped>
@import "../scss/phone-input.scss";
</style>       
