<template>
  <div id="app">
    <h1>Phone Input Demo</h1>
    <PhoneInput/>
  </div>
</template>

<script>
import PhoneInput from './components/PhoneInput'

export default {
  name: 'App',
  components: {
    PhoneInput
  }
}
</script>

<style lang="scss">
@import "./scss/app.scss";
</style>
