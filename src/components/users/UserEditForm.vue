<template>
  <div class="row">
    <Loader :loading="loading"></Loader>
    <div v-if="!loading" class="col-md-12 rounded shadow content-pane">
      <form class="form" @submit.prevent="submitForm">
        <FormInputLabel forInput="username">Username</FormInputLabel>
        <b-form-input id="username" type="text" :state="$v.form.username.$dirty ? !$v.form.username.$error : null" placeholder="Username"
                      v-model="$v.form.username.$model" autocomplete="username" :disabled="editMode ? true : false" trim></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.form.username.required">Username is required</span>
          <span v-if="!$v.form.username.minLength">Username must be at least {{ $v.form.username.$params.minLength.min }} characters long</span>
        </b-form-invalid-feedback>
        
        <FormInputLabel for="password">Password</FormInputLabel>
        <b-form-input id="password" type="password" class="password-input"
                      :state="$v.form.password.$dirty || $v.form.shadow_password.$dirty ? !($v.form.password.$error || $v.form.shadow_password.$error) : null"
                      placeholder="Password" v-model="$v.form.password.$model" autocomplete="password" trim></b-form-input>
        <b-form-input id="shadow-password" type="password" class="form-control password-input password-input-right"
                      :state="shadowPasswordValid()"
                      placeholder="Verify password" v-model="$v.form.shadow_password.$model" autocomplete="password"></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.form.password.required">Password is required<br/></span>
          <span v-if="!$v.form.password.minLength">Password must be at least {{ $v.form.password.$params.minLength.min }} characters long<br/></span>
          <span v-if="!$v.form.shadow_password.sameAs">Passwords don't match</span>
        </b-form-invalid-feedback>

        <FormInputLabel for="roles">Roles</FormInputLabel>
        <VueSelect id="roles" v-model="$v.form.roles.$model" :class="getRolesInputClass()" :options="roles" multiple>
        </VueSelect>
        <span v-if="$v.form.roles.$dirty">
          <p class="form-error text-danger" v-if="!$v.form.roles.required">At least one role is required</p>
        </span>

        <FormInputLabel for="given-name">Given name</FormInputLabel>
        <b-form-input id="given-name" type="text" :state="$v.form.given_name.$dirty ? !$v.form.given_name.$error : null"
                      placeholder="Given name" v-model="$v.form.given_name.$model" trim></b-form-input>
        <b-form-invalid-feedback>
          <p v-if="!$v.form.given_name.required">Given name is required</p>
          <p v-if="!$v.form.given_name.minLength">Given name must be at least {{ $v.form.given_name.$params.minLength.min }} characters long</p>
        </b-form-invalid-feedback>

        <FormInputLabel for="family-name">Family name</FormInputLabel>
        <b-form-input id="family-name" type="text" :state="$v.form.family_name.$dirty ? !$v.form.family_name.$error : null"
                      placeholder="Family name" v-model="$v.form.family_name.$model" trim></b-form-input>
        <b-form-invalid-feedback>
          <span v-if="!$v.form.family_name.required">Family name is required</span>
          <span v-if="!$v.form.family_name.minLength">Family name must be at least {{ $v.form.family_name.$params.minLength.min }} characters long</span>
        </b-form-invalid-feedback>

        <input type="submit" class="btn btn-primary" :value="submitText || 'Submit'" />
      </form>
    </div>
  </div>
</template>

<script>
import ApiClient from "@/services/api_client";

import FormInputLabel from "@/components/FormInputLabel";
import Fragment from "vue-fragment";
import Loader from "@/components/Loader";
import { validationMixin } from "vuelidate";
import { required, requiredIf, minLength, sameAs } from "vuelidate/lib/validators";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  mixins: [validationMixin],
  components: {FormInputLabel, Fragment, Loader, VueSelect},
  props: ['user', 'loading', 'editMode', 'submitText'],
  data() {
    return {
      roles: [],
      form: {
        username: '',
        password: null,
        shadow_password: null,
        roles: [],
        given_name: null,
        family_name: null
      }
    };
  },
  mounted() {
    this.fetchRoles()
        .then(roles => this.roles = roles.map(role => role.role))
        .then(this.loadUserIntoForm);
  },
  validations() {
    return {
      form: {
        username: {
          required: requiredIf(() => !this.editMode),
          minLength: minLength(4),
        },
        password: {
          required: requiredIf(() => !this.editMode),
          minLength: minLength(6)
        },
        shadow_password: {
          sameAs: sameAs('password')
        },
        roles: {
          required
        },
        given_name: {
          required,
          minLength: minLength(2)
        },
        family_name: {
          required,
          minLength: minLength(2)
        }
      }
    }
  },
  methods: {
    async fetchRoles() {
      const response = await ApiClient.get('roles?paginate=false');
      
      if (response.status !== 200) {
        alert('Failed to retrieve roles from API');
      }

      return await response.json();
    },
    async submitForm(event) {
      if (!this.validateForm()) {
        return;
      }
      
      const {shadow_password: _, ...user} = this.form;

      this.$emit('on-submit', user);
    },
    loadUserIntoForm() {
      if (!this.user) {
        return;
      }

      this.form.username = this.user.username;
      this.form.given_name = this.user.given_name;
      this.form.family_name = this.user.family_name;
      this.form.roles = this.roles.filter(role => this.user.roles.findIndex(userRole => role === userRole.role) >= 0);
    },
    validateForm() {
      this.$v.$touch();
      return !this.$v.$invalid;
    },
    shadowPasswordValid() {
      if (this.$v.form.password.$dirty && this.$v.form.shadow_password.$dirty) {
        return !(this.$v.form.password.$error || this.$v.form.shadow_password.$error);
      } else if (this.$v.form.shadow_password.$dirty) {
        return !this.$v.form.shadow_password.$error;
      } else if (this.$v.form.password.$dirty) {
        return this.$v.form.password.$error ? false : null;
      } else {
        return null;
      }
    },
    getRolesInputClass() {
      if (!this.$v.form.roles.$dirty) return;

      if (this.$v.form.roles.$error) {
        return 'form-control-invalid';
      } else {
        return 'form-control-valid';
      }
    }
  }
}
</script>

<style scoped>
input, select {
  margin-top: 2%;
}

input[type="submit"] {
  float: center;
  min-width: 20%;
}

.content-pane {
  max-width: 90%;
  max-height: 90%;
  padding: 2em;
  left: 5%;
  right: 5%;
}

.form-control {
  margin-top: 0;
  margin-bottom: 0
}

.password-input {
  max-width: 49%;
  display: inline-block;
}

.password-input-right {
  margin-left: 2%;
}
</style>