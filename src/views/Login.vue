
<template>
  <div>
    <div class="login-box">
      <div class="login-logo">
        <a href>E-Mastercard</a>
      </div>
      <!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">User Account Login</p>

        <form action method="post" @submit="checkForm">
          <div class="form-group has-feedback">
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="User name"
              id="username"
              v-model="username"
            />
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input
              type="password"
              class="form-control"
              name="pass"
              placeholder="Password"
              id="password"
              v-model="password"
            />
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="center">
              <input
                type="submit"
                class="btn btn-primary btn-block btn-flat"
                value="Submit"
              />
            </div>
            <!-- /.col -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import ApiClient from "../services/api_client";

const MIN_USERNAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 4;

function validateUsername(form, username) {
  console.log(form)

  if (!username || username.length < MIN_USERNAME_LENGTH) {
    form.errors.push('Username required')
    return false
  }

  return true
}

function validatePassword(form, password) {
  console.log([form, password])
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    form.errors.push('Password must be at least 4 characters long')
    return false
  }

  return true
}

export default {
  data: function() {
    return {
      errors: [],
      username: null,
      password: null
    };
  },
  methods: {
    checkForm: async function(event) {
      event.preventDefault();

      this.errors = []

      if (!(validateUsername(this, this.username) && validatePassword(this, this.password))) return;
      
      const params = {username: this.username, password: this.password};
      const response = await ApiClient.post("auth/login", params, {noRedirectCodes: [401]});

      if (response.status === 200) {
        const {data: {token, user}} = await response.json();
        sessionStorage.setItem('apiKey', token);
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('userID', user.user_id);
        this.$store.commit('setUser', user);
        this.$router.push('/');
      } else {
        this.errors.push('Invalid username or password');
        console.warn(`Response: ${response.status} - ${response.body}`);
        return;
      }
    }
  }, created: function() {
    sessionStorage.clear();
    this.$store.user = null;
    ApiClient.getConfig();
  }
}
</script>
<style scoped>
</style>