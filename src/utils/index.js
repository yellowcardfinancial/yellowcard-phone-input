import Vue from vue
import YellowcardPhoneInput from '../PhoneInput.vue'

const Components = {
    YellowcardPhoneInput
}


Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
  });
  
  export default Components;