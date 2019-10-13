import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
// 按需引入
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  Checkbox,
  CheckboxGroup,
  Loading,
  Tip,
  Popup,
  Toast,
  Picker,
  TimePicker,
  Dialog,
  ActionSheet,
  Scroll,
  Slide,
  IndexList,
  createAPI
} from 'cube-ui'

import SubscribeDialog from './components/dialog/dialog'

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(TimePicker)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(IndexList)

Vue.config.productionTip = false
createAPI(Vue, SubscribeDialog, [], true)

new Vue({
  render: h => h(App),
}).$mount('#app')
