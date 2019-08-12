<template>
  <div class="input-container">
      <select class="countries">
        <option>NIG</option>
        <option>AFG</option>
      </select>
      <input type="tel" class="phone" placeholder="Phone number">
    </div>
</template>

<script>
import countries from '../countries.json';

export default {
  name: 'PhoneInput',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>


<style lang="scss">
@import "../scss/phone-input.scss";
</style>       
