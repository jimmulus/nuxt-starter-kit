import {
  extend,
  localize
} from "vee-validate";
import nl from 'vee-validate/dist/locale/nl.json';
import {
  required,
  email,
  image,
  min
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
})

extend("email", {
  ...email,
})
extend("min", {
  ...min,
})
extend("image", {
  ...image,
})

extend('password', {
  params: ['target'],
  validate(value, {
    target
  }) {
    return value === target
  },
  message: 'Wachtwoorden komen niet overeen.'
})

localize("nl", nl);
