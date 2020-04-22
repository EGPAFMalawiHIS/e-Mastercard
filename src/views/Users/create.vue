<template>
  <PageView>
    <UserEditForm @on-submit="createUser"
                  submitText="Create user"
                  :loading="loading" />
  </PageView>
</template>

<script>
import ApiClient from "@/services/api_client";
import PageView from "@/components/PageView";
import UserEditForm from "@/components/users/UserEditForm"

export default {
  components: {PageView, UserEditForm},
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async createUser(user) {
      try {
        this.loading = true;
        const response = await ApiClient.post('/users', user); 

        if (response.status !== 201) {
          const {errors} = await response.json();
          this.$bvToast.toast(`Failed to create user: ${errors.join(', ')}`, {title: 'Error', variant: 'danger'});
          return;
        }

        this.$router.push({name: 'ListUsers'});
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>