# @yellowcard/phone-input-component

> This is an individual phone input component for retrieving a user's phone number. 

## Requirements
Before installation, the following packages are required:
- node sass
- sass-loader
- style-loader

``` bash
npm i sass-loader node-sass style-loader --save
```
## Installaion

``` bash
# install component with npm 
npm install @yellowcard/phone-input-component --save
```

## Imports
Import the package directly into the vue component you want to use it in  eg; `App.vue` file

``` javascript
import YellowcardPhoneInput from '@yellowcard/phone-input-component'
```

## Usage
After this has been imported, use the `YellowcardPhoneInput` tag to apply it to your application component.
``` html
<YellowcardPhoneInput> </YellowcardPhoneInput>
```
or
```html
<YellowcardPhoneInput/>
```
### Component Props 
- initialValue: {
   - type : `String`
   - default : ''
}

- locale: {
    - type: `String`,
    - default: `NG`
}

By passing of props to the component, your final usage would look like this
``` html
<YellowcardPhoneInput initialValue='value' locale='NG'/>
```
<!-- For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader). -->
