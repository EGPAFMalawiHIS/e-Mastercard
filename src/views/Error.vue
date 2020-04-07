<template>
  <PageView>
    <h1>Error</h1>
    <p>{{ message() }}</p>
  </PageView>
</template>

<script>
import PageView from "@/components/PageView";

export default {
  name: "Users",
  components: {PageView},
  data() {
    return {
      users: [],
      loading: true
    }
  },
  methods: {
    message() {
      return this.$route.params['message'];
    },
  }
}
</script>