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
  mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.loading = true;
      this.users = await this.fetchUsers();
      this.loading = false;
    },
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
    async deactivateUser(userId) {
      if (userId === this.$store.state.user.user_id) {
        this.$bvToast.toast('You can not deactivate your own account', {title: 'Error', variant: 'danger'});
        return;
      }

      const response = await ApiClient.post(`users/${userId}/deactivate`);

      if (response.status !== 200) {
        const {errors} = await response.json();
        this.$bvToast.toast(`Failed to deactivate user: ${errors.join(',')}`, {title: 'Error', variant: 'danger'});
        return;
      }

      const {user} = await response.json();
      this.$bvToast.toast(`User ${user.username} deactivated`, {title: 'Success'});
      this.loadUsers();
    },
    async activateUser(userId) {
      const response = await ApiClient.post(`users/${userId}/activate`);

      if (response.status !== 200) {
        const {errors} = await response.json(); 
        this.$bvToast.toast(`Failed to activate user: ${errors.join(',')}`, {title: 'Error', variant: 'danger'});
        return;
      }

      const {user} = await response.json();
      this.$bvToast.toast(`User ${user.username} activated`, {title: 'Success', variant: 'success'});
      this.loadUsers();
    }
  }
}
</script>