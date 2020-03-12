<template>
  <PageView>
    <UserEditForm @on-submit="editUser"
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
    this.fetchUser()
        .then(user => {
          const name = user.person.names[0];

          this.user = {
            user_id: user.user_id,
            username: user.username,
            given_name: name && name.given_name,
            family_name: name && name.family_name,
            roles: user.roles
          }
        });
  },
  computed: {
    userId() {
      return this.$route.params['userId'];
    }
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async editUser(user) {
      const {password, ...params} = user;
      if (password && password.length > 0) {
        params['password'] = password
      }

      const response = await ApiClient.put(`/users/${this.user.user_id}`, params); 

      if (response.status !== 200) {
        response.text()
                .then(alert)
        return;
      }

      this.$router.push({name: 'ListUsers'});
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
    }
  }
}
</script>