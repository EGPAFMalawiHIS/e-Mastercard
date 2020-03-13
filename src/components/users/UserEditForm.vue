<template>
  <div class="row">
    <Loader :loading="loading"></Loader>
    <div v-if="!loading" class="col-md-12 rounded shadow content-pane">
      <form class="form" @submit.prevent="submitForm">
        <FormInputLabel forInput="username">Username</FormInputLabel>
        <input id="username" type="text" class="form-control" :class="$v.form.username.$error && 'form-control-invalid'" placeholder="Username"
               v-model.trim="$v.form.username.$model"
               autocomplete="username"
               :disabled="editMode ? true : false" />
        <span v-if="$v.form.username.$dirty">
          <p class="text-danger form-error" v-if="!$v.form.username.required">Username is required</p>
          <p class="text-danger form-error" v-if="!$v.form.username.minLength">Username must be at least {{ $v.form.username.$params.minLength.min }} characters long</p>
        </span>
        
        <FormInputLabel for="password">Password</FormInputLabel>
        <input id="password" type="password" class="form-control password-input"
               :class="($v.form.password.$error || $v.form.shadow_password.$error) && 'form-control-invalid'"
               placeholder="Password" v-model.trim="$v.form.password.$model"
               autocomplete="password" />
        <input id="shadow-password" type="password" class="form-control password-input password-input-right"
               :class="($v.form.password.$error || $v.form.shadow_password.$error) && 'form-control-invalid'"
               placeholder="Verify password" v-model="$v.form.shadow_password.$model"
               autocomplete="password" />
        <span v-if="$v.form.password.$dirty">
          <p class="form-error text-danger" v-if="!$v.form.password.required">Password is required</p>
          <p class="form-error text-danger" v-if="!$v.form.password.minLength">Password must be at least {{ $v.form.password.$params.minLength.min }} characters long</p>
        </span>
        <span v-if="$v.form.shadow_password.$dirty">
          <p class="form-error text-danger" v-if="!$v.form.shadow_password.sameAs">Passwords don't match</p>
        </span>


        <FormInputLabel for="roles">Roles</FormInputLabel>
        <VueSelect id="roles" v-model="$v.form.roles.$model"
                  :class="$v.form.roles.$error && 'form-control-invalid'"
                  :options="roles" multiple>
        </VueSelect>
        <span v-if="$v.form.roles.$dirty">
          <p class="form-error text-danger" v-if="!$v.form.roles.required">At least one role is required</p>
        </span>

        <FormInputLabel for="given-name">Given name</FormInputLabel>
        <input id="given-name" type="text" class="form-control"
               :class="$v.form.given_name.$error && 'form-control-invalid'"
               placeholder="Given name" v-model="$v.form.given_name.$model" />
        <span v-if="$v.form.given_name.$dirty">
          <p class="form-error text-danger" v-if="!$v.form.given_name.required">Given name is required</p>
          <p class="form-error text-danger" v-if="!$v.form.given_name.minLength">Given name must be at least {{ $v.form.given_name.$params.minLength.min }} characters long</p>
        </span>

        <FormInputLabel for="family-name">Family name</FormInputLabel>
        <input id="family-name" type="text" class="form-control"
               :class="$v.form.family_name.$error && 'form-control-invalid'"
               placeholder="Family name" v-model="$v.form.family_name.$model" />
        <span v-if="$v.form.family_name.$dirty">
          <p class="form-error text-danger" v-if="!$v.form.family_name.required">Family name is required</p>
          <p class="form-error text-danger" v-if="!$v.form.family_name.minLength">Family name must be at least {{ $v.form.family_name.$params.minLength.min }} characters long</p>
        </span>

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
  props: ['user', 'editMode', 'submitText'],
  data() {
    return {
      loading: true,
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
    this.loading = true;

    this.fetchRoles()
        .then(roles => this.roles = roles.map(role => role.role))
        .then(this.loadUserIntoForm)
        .then(() => this.loading = false);
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

      this.loading = true;
      
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

.form-control-invalid {
  border-color: red;
  box-shadow: inset 0 1px 1px orangered,  0 0 8px red;
}

.form-error {
  font-size: 0.8em;
  margin: 0;
}

.password-input {
  max-width: 49%;
  display: inline-block;
}

.password-input-right {
  margin-left: 2%;
}
</style>