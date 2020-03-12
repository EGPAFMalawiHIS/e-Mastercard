<template>
  <PageView>
    <UserEditForm @on-submit="createUser" />
  </PageView>
</template>

<script>
import PageView from "@/components/PageView";
import UserEditForm from "@/components/users/UserEditForm"

export default {
  components: {PageView, UserEditForm},
  methods: {
    async createUser(user) {
      const response = await ApiClient.post('/users', user); 

      if (response.status == 400) {
        response.text()
                .then(alert)
        return;
      }

      this.$router.push({name: 'ListUsers'});
    }
  }
}
</script>