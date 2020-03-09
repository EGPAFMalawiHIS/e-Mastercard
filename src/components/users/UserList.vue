<template>
  <table class="table table-striped">
    <thead>
      <th>Username</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Roles</th>
      <th>Deactivated on</th>
    </thead>

    <tbody>
      <tr v-for="user in users" :key="user.user_id">
        <td>{{ user.username }}</td>
        <td>{{ user.given_name }}</td>
        <td>{{ user.family_name }}</td>
        <td>
          <ul>
            <li v-for="{role} in user.roles" :key="role" class="user-role">{{role}}</li>
          </ul>
        </td>
        <td>{{ user.deactivated_on ? user.deactivated_on : 'N/A' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Fragment } from 'vue-fragment';

export default {
  props: ["users"],
  components: [Fragment]
}
</script>

<style scoped>
table {
  margin-top: 2%;
}

h2 {
  text-align: left;
  color: gray;
}

.user-role {
  text-align: left;
}
</style>