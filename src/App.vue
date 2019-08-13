<template>
  <div id="app">
    <h1>Phone Input Demo</h1>
    <YellowcardPhoneInput locale="NG"/>
  </div>
</template>

<script>
import YellowcardPhoneInput from './components/PhoneInput'

export default {
  name: 'App',
  components: {
    YellowcardPhoneInput
  },
  props: ['locale', 'initialValue']
}
</script>

<style lang="scss">
@import "./scss/app.scss";
</style>
