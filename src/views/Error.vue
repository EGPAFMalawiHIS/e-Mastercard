<template>
  <div id="view-pane">
    <div id="content">
      <h1>Something Went Wrong</h1>
      <hr />
      <p>eMastercard experienced an unexpected error. More details are provided below:</p>
      <br />
      <pre v-if="message">
        <p>{{ message }}</p>
      </pre>
      <router-link to="/">Go Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: [],
      loading: true
    }
  },
  computed: {
    message() {
      return this.$route.params['message'] || this.$route.query['message'];
    },
  }
}
</script>

<style scope>
#view-pane {
  position: absolute;
  height: 100%;
  width: 100%;
}

#content {
  display: inline-block;
  margin: auto;
  text-align: center;
  padding-top: 10%;
  max-width: 80%;
}

pre {
  background-color: moccasin;
  border-radius: 5px;
}
</style>