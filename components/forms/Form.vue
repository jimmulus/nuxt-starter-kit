<template>
  <div>
  <ValidationObserver ref="observer" v-slot="{ errors }">
    <v-form
      ref="registerForm"
      @submit.prevent="onSubmit"
      :disabled="disabled"
      class="mb-5"
    >
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          color="white"
          size="64"
          style="position: absolute"
        ></v-progress-circular>
      </v-overlay>

      <v-row>
        <v-col>
          <ul v-if="errors">
            <template v-for="(error, index) in errors">
              <li
                v-if="error.length > 0"
                :key="index"
                class="v-messages theme--light error--text"
              >
                {{ error[0] }}
              </li>
            </template>
          </ul>
        </v-col>
      </v-row>
      <v-row
        dense
        v-for="(section, index) in formFields"
        :key="index"
        :class="section.toggle ? checkToggle(section.toggle) : false"
      >
        <v-col cols="12" class="pa-0 ma-0">
          <h3 class="my-2">{{ section.title }}</h3>
        </v-col>

        <v-col
          :class="fieldGroup.toggle ? checkToggle(fieldGroup.toggle) : false"
          cols="12"
          v-for="(fieldGroup, index) in section.fieldGroups"
          :key="index"
        >
          <p v-if="fieldGroup.groupName !== ''">{{ fieldGroup.groupName }}</p>
          <v-row>
            <v-col
              :class="field.toggle ? checkToggle(field.toggle) : false"
              cols="12"
              :lg="field.cols ? field.cols : 12"
              v-for="field in fieldGroup.fields"
              :key="field.name"
            >
              <div>

                <p v-if="field.info">{{ field.info }}</p>
                <FormsInputsCanvas
                  v-if="field.type === 'canvas'"
                  :type="field.type"
                  v-model="Form[field.name]"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :disabled="disabled"
                />

                <FormsInputsText
                  v-if="
                    ['text', 'date', 'number', 'email', 'password'].includes(field.type)
                  "
                  :type="field.type"
                  v-model="Form[field.name]"
                  :prepend="field.prepend"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :readonly="field.readonly"
                  :disabled="disabled"
                  :prefix="field.prefix"
                  :suffix="field.suffix"
                  :class="field.toggle ? checkToggle(field.toggle) : false"
                  :group="field.group"
                >
                </FormsInputsText>

                <FormsInputsTextarea
                  v-if="field.type === 'textarea'"
                  :type="field.type"
                  v-model="Form[field.name]"
                  :prepend="field.prepend"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                >
                </FormsInputsTextarea>
                <FormsInputsFile
                  @field="check($event, field.name)"
                  v-if="field.type === 'file'"
                  v-model="Form[field.name]"
                  :prepend="field.prepend"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :amount="field.amount"
                  :disabled="disabled"
                ></FormsInputsFile>

                <FormsInputsFileMulti
                  class=".col-md-3"
                  @field="check($event, field.name)"
                  v-if="field.type === 'multi-file'"
                  v-model="Form[field.name]"
                  :prepend="field.prepend"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :disabled="disabled"
                  :amount="field.amount"
                ></FormsInputsFileMulti>

                <FormsInputsFileDrag
                  :multiple="field.amount > 1"
                  v-if="field.type === 'file-drag'"
                  @field="check($event, field.name)"
                  v-model="Form[field.name]"
                  :prepend="field.prepend"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :disabled="disabled"
                  :amount="field.amount"
                  :check="aanvraagGegevens[field.name] !== ''"
/>
                <FormsInputsRadio
                  v-if="field.type === 'radio'"
                  v-model="Form[field.name]"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :options="field.options"
                  :inline="field.inline"
                  :disabled="disabled"
                >
                </FormsInputsRadio>
                <FormsInputsCheckbox
                  v-if="field.type === 'checkbox'"
                  v-model="Form[field.name]"
                  :name="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :options="field.options"
                  :disabled="disabled"
                >
                </FormsInputsCheckbox>
                <FormsInputsSelect
                  :cols="3"
                  v-if="field.type === 'select'"
                  v-model="Form[field.name]"
                  :name="field.name"
                  :field="field.name"
                  :label="field.label"
                  :rules="field.rules"
                  :options="field.options"
                  :disabled="disabled"
                ></FormsInputsSelect>

                <FormsInputsCombobox
                  :cols="3"
                  v-if="field.type === 'combo'"
                  v-model="Form[field.name]"
                  :name="field.name"
                  :field="field.label"
                  :label="field.label"
                  :rules="field.rules"
                  :options="field.options"
                  :disabled="disabled"
                ></FormsInputsCombobox>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row dense v-if="!disabled">
        <v-col class="d-flex mt-4" cols="12">
          <v-btn block color="primary white--text" type="submit">
            {{ knopTekst }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
  </div>
</template>


<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  props: {
    postRoute: {
      type: String,
      default: "/api",
    },
    knopTekst: {
      type: String,
      default: "Verzend",
    },
    submit: {
      type: String,
      default: "",
    },
    aanvraagGegevens: {
      type: Object,
      default() {
        return {};
      },
    },
    checks: {
      type: Object,
      default() {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    formFields: {
      type: Array,
      default() {
        return [];
      },
    },
    resetForm: {
      type: Boolean,
      default: false,
    },
    redirect: {
      type: String,
      default: "",
    },
    subsidieType: {
      type: String,
      default: "",
    },
    uuidKey: {
      type: String,
      default: "UUID_GS_Aanvraag",
    }
  },

  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },
  data: () => ({
    overlay: false,
    valid: true,
    new: {},
    Form: {},
    fout: {},
  }),
  async beforeMount() {
    await this.$store.dispatch("csrf/getCSRF");
  },

  mounted() {
    this.Form = this.aanvraagGegevens;
    console.log(this.$refs.observer)
  },
  watch: {
    // Form: {
    //   handler(val, oldVal) {
    //     console.log("Item Changed");
    //     console.log(val);
    //   },
    //   deep: true,
    //},
    submit: {
      async handler(val) {
        if(val==='submit')
        await this.onSubmit()
      },
    }
  },

  methods: {
    check(e, field) {
      this.Form[field] = e;
    },

    checkToggle(toggle, name) {


      for (const [key, value] of Object.entries(toggle)) {
        console.log()
        if (Array.isArray(this.Form[key])) {
          if (!this.Form[key].includes(value)) {
            delete this.Form[name];
            return "d-none";
          }
        } else if (Array.isArray(value)) {
          if(!value.includes(this.Form[key])) {
            console.log(this.Form[key], Array.isArray(value), !value.includes(this.Form[key]))
            delete this.Form[name];
            return "d-none";
          }
        } else if (this.Form[key] !== value) {
          delete this.Form[name];
          return "d-none";
        }
      }
    },
    appendError(e) {
       this.$refs.observer.setErrors(e)
    },
    filterFormFields() {
      const fields = [];
      this.formFields.map((part) => {
        part.fieldGroups.map((group) => {
          console.log({ fields: group.fields })
          if (Array.isArray(group.fields)) {
            group.fields.map((i) => {
              fields.push(i.name);
            })
          }
        })
      })
      return fields
    },
    async onSubmit() {

      if (this.$refs.observer.validate()) {
        this.overlay = true;
        let formData = new FormData();

        Object.entries(this.Form).forEach(([key, value]) => {
          const filtered = this.filterFormFields()
          console.log({filtered, key, value})
          if(filtered.includes(key)) {
            if (Array.isArray(value)) {
              for (let i = 0; i < value.length; i++) {
                formData.append(key, value[i]);
              }
            } else {
              formData.append(key, value);
            }
          }
        });
        this.$route.params.uuid && this.uuidKey !== ""
          ? formData.append(
              this.uuidKey,
              this.$route.params.uuid
            )
          : false;

        try {
          await this.$store.dispatch("csrf/getCSRF");

          const response = await this.$axios.post(this.postRoute, formData);
          this.$auth.fetchUser()
          await this.$notifier.showMessage({
            content: response.data.message,
            color: "success",
            timeout: 3000,
          });
          this.$emit("resetSubmit", true);
          if (response.data.data.status) {
            this.$emit("setStatus", response.data.data.status);
            if (response.data.data.checks) {
              this.$emit("setChecks", response.data.data.checks);
            }
            if (response.data.data.form) {

              this.$emit("setForm", response.data.data.form);
            }
          }
          if (this.resetForm === true) {
            this.$refs.form.reset();
            //this.aanvraagGegevens = {}
            let naar = ''
            if(this.redirect === '/subsidies' && response.data.data.UUID_GS_Aanvraag) {
              naar = '/subsidies/' + response.data.data.UUID_GS_Aanvraag
            } else naar = this.redirect

            setTimeout(() => {
              this.overlay = false;
              this.$router.push({ path: naar });
            }, 3000);
          } else {
            this.overlay = false;
          }
        } catch (e) {
          this.overlay = false;

          console.log(e);
          if (e.response.status == 422) {
            this.$notifier.showMessage({
              content: "Een aantal velden zijn niet (juist) ingevuld.",
              color: "error",
              timeout: 3000,
            });
            this.$refs.observer.setErrors(e.response.data);
          } else {
            this.$notifier.showMessage({
              content: e.response.data.message ?? 'Er is iets mis gegaan met verzenden. Probeer het later nog eens',
              color: "error",
              timeout: 6000,
            });
          }
          this.$emit("resetSubmit", true);
        }
      }
    },
  },
};
</script>

<style lang="css">
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  padding-top: 0px !important;
}

.v-input--selection-controls {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.v-text-field__details {
  max-height: 0px !important;
}
</style>
