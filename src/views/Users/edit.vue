<template>
  <PageView>
    <UserEditForm :loading="loading"
                  @on-submit="editUser"
                  :user="user"
                  :editMode="true"
                  submitText="Update user" />
  </PageView>
</template>

<script>
import ApiClient from "@/services/api_client";

import PageView from "@/components/PageView";
import UserEditForm from "@/components/users/UserEditForm"

export default {
  components: {PageView, UserEditForm},
  created() {
    this.loadUser();
  },
  computed: {
    userId() {
      return this.$route.params['userId'];
    }
  },
  data() {
    return {
      user: {},
      loading: true
    }
  },
  methods: {
    async editUser(user) {
      try {
        this.loading = true;
        const {password, ...params} = user;
        if (password && password.length > 0) {
          params['password'] = password
        }

        const response = await ApiClient.put(`/users/${this.user.user_id}`, params); 

        if (response.status !== 200) {
          const {errors} = await response.json();
          this.$vbToast.toast(`Failed to update user: ${errors.join(', ')}`, {title: 'Error', variant: 'danger'});
          return;
        }

        this.$router.push({name: 'ListUsers'});
      } finally {
        this.loading = false;
      }
    },
    async fetchUser() {
      const response = await ApiClient.get(`/users/${this.userId}`);

      if (response.status === 404) {
        this.$router.push({name: 'NotFoundError', params: {message: `User #${this.userId} not found!`}});
        return null;
      } else if (response.status !== 200) {
        alert(`Unexpected error occurred: ${response.status}`);
        return null;
      } else {
        return response.json();
      }
    },
    async loadUser() {
      this.loading = true;

      const user = await this.fetchUser();
      const name = user.person.names[0];

      this.user = {
        user_id: user.user_id,
        username: user.username,
        given_name: name && name.given_name,
        family_name: name && name.family_name,
        roles: user.roles
      };

      this.loading = false;
    }
  }
}
</script>