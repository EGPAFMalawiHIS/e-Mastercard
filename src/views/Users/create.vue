<template>
  <PageView>
    <UserCreateForm />
  </PageView>
</template>

<script>
import PageView from "@/components/PageView";
import UserCreateForm from "@/components/users/UserCreateForm"

export default {
  components: {PageView, UserCreateForm}
}
</script>