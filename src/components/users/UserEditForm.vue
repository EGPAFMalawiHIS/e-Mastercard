<template>
  <div class="row">
    <div class="col-md-12 rounded shadow content-pane">
      <form class="form" @submit="submitForm">
        <FormInputLabel forInput="username">Username</FormInputLabel>
        <input id="username" type="text" class="form-control" placeholder="Username"
               v-model.trim="form.username" @input="$v.username.$touch()"
               autocomplete="username" required minlength=4
               :disabled="editMode ? true : false" />
        <p class="alert alert-danger" v-if="!$v.username.required">Username is required</p>
        <p class="alert alert-danger" v-if="!$v.username.minLength">Username must be at least 4 characters long</p>
        
        <FormInputLabel for="password">Password</FormInputLabel>
        <input id="password" type="password" class="form-control password-input"
               placeholder="Password" v-model.trim="form.password"
               @input="$v.password.$touch()" autocomplete="password" required minlength=6 />
        <input id="shadow-password" type="password" class="form-control password-input password-input-right"
               placeholder="Verify password" v-model="$v.shadow_password"
               autocomplete="password" required minlength=6 />
        <p class="alert alert-danger" v-if="!$v.password.required">Password is required</p>
        <p class="alert alert-danger" v-if="!$v.password.minLength">Username must be at least 6 characters long</p>

        <FormInputLabel for="roles">Roles</FormInputLabel>
        <VueSelect id="roles" v-model="form.roles" :options="roles" multiple></VueSelect>

        <FormInputLabel for="given-name">Given name</FormInputLabel>
        <input id="given-name" type="text" class="form-control" placeholder="Given name" v-model="form.given_name" required />

        <FormInputLabel for="family-name">Family name</FormInputLabel>
        <input id="family-name" type="text" class="form-control" placeholder="Family name" v-model="form.family_name" required />

        <input type="submit" class="btn btn-primary" :value="submitText || 'Submit'" />
      </form>
    </div>
  </div>
</template>

<script>
import ApiClient from "@/services/api_client";
import FormInputLabel from "@/components/FormInputLabel";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  mixins: [validationMixin],
  components: {FormInputLabel, VueSelect},
  props: ['user', 'editMode', 'submitText'],
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
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
      minLength: minLength(6)
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
      event.preventDefault();

      // if (!this.validateForm()) {
      //   return;
      // }
      
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

.password-input {
  max-width: 49%;
  display: inline-block;
}

.password-input-right {
  margin-left: 2%;
}
</style>