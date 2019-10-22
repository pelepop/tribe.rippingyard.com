import Vue from 'vue';
import ja from 'vee-validate/dist/locale/ja';
import {
  ValidationProvider, ValidationObserver, localize, configure, extend,
} from 'vee-validate'
import {
  required, max, email,
} from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

configure({
  bails: false,
});

// 必要なruleを追加していく
extend('required', { ...required });
extend('max', { ...max });
extend('email', { ...email });

// 一括でもrulesをextendできる
// import * as rules from 'vee-validate/dist/rules';
// for (let rule in rules) {
//   extend(rule, rules[rule]);
// }

localize('ja', ja);