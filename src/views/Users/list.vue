<template>
  <PageView>
    <UserList :users="users"
              :show-loader="loading"
              @create-user="createUser"
              @edit-user="editUser"
              @deactivate-user="deactivateUser"
              @activate-user="activateUser" />
  </PageView>
</template>

<script>
import ApiClient from "@/services/api_client";

import Action from "@/components/Action";
import ActionPane from "@/components/ActionPane";
import SideBar from "@/components/SideBar";
import PageView from "@/components/PageView";
import UserList from "@/components/users/UserList";

export default {
  name: "Users",
  components: { Action, ActionPane, PageView, UserList },
  data() {
    return {
      users: [],
      loading: true
    }
  },
  created() {
    this.fetchUsers()
        .then((users) => {
          this.users = users;
          this.loading = false;
        });
  },
  methods: {
    async fetchUsers() {
      const response = await ApiClient.get("users?paginate=false");
      const users = await response.json();

      const attachNamesToUsers = users.map(async user => {
        const response = await ApiClient.get(`people/${user.person_id}/names`);
        const names = await response.json();
        const name = names[0] || {given_name: "Unknown", family_name: "Unknown", middle_name: "Unknown"};

        return {
          ...user,
          ...name
        };
      });

      return await Promise.all(attachNamesToUsers);
    },
    createUser() {
      this.$router.push({name: 'CreateUser'});
    },
    editUser(userId) {
      this.$router.push({name: 'EditUser', params: {userId}})
    },
    deactivateUser(userId) {
      console.log(['deactivateUser', userId]);
    },
    activateUser(userId) {
      console.log(['activateUser', userId]);
    }
  }
}
</script>