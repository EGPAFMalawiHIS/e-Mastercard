<template>
  <div class="row">
    <div class="col-md-9">
      <form class="form">
        <input type="text" class="form-control" placeholder="Username" v-model="form.username" required />
        <input type="password" class="form-control" placeholder="Password" v-model="form.password" required />
        <input type="password" class="form-control" placeholder="Password (again)" v-model="form.shadow_password" required />
        <select class="form-control" v-model="form.roles" multiple>
          <option v-for="{role} in roles" :key="role">{{ role }}</option>
        </select>
        <hr />
        <input type="text" class="form-control" placeholder="Given name" v-model="form.given_name" />
        <input type="text" class="form-control" placeholder="Family name" v-model="form.family_name" />
        <input type="submit" class="btn btn-primary" value="Create User" required />
      </form>
    </div>
  </div>
</template>

<script>
import ApiClient from "@/services/api_client";

export default {
  data() {
    return {
      roles: [],
      form: {
        username: null,
        password: null,
        shadow_password: null,
        roles: [],
        given_name: null,
        family_name: null
      }
    };
  },
  created() {
    this.fetchAndLoadRoles();
  },
  methods: {
    async fetchAndLoadRoles() {
      const response = await ApiClient.get('roles?paginate=false');
      this.roles = await response.json();
    }
  }
}
</script>

<style scoped>
input, select {
  margin-top: 2%;
}

input[type="submit"] {
  right: 0;
  float: right;
  min-width: 20%;
}
</style>