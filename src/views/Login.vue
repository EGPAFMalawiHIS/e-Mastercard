<template>
  <div class="container-fluid vh-100 d-flex flex-column">
    <div class="row" style="height: 100%;">
      <div class="col-md-8">
       
          <img
            src="../assets/egpaf.jpg"
            alt="placeholder"
            srcset
            style="width:100%; height:100%; object-fit: cover;"
          />
      </div>
      <div class="col-md-4">
        <div class="login-box" style="margin-top:30%; padding:10%;">
          <div class="login-logo">
            <h1>E-Mastercard</h1>

            <h4>
              <small>V 2.0</small>
              <br />
            </h4>
            <h3>
              <small>Welcome back! Please login to your account.</small>
            </h3>
            <br />
          </div>
          <!-- /.login-logo -->
          <div class="login-box-body">
            <form action method="post" @submit="checkForm">
              <div class="form-group has-feedback">
                <input
                  type="text"
                  class="form-control inputnice"
                  name="username"
                  placeholder="User name"
                  id="username"
                  v-model="username"
                  required
                />
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input
                  type="password"
                  class="form-control inputnice"
                  name="pass"
                  placeholder="Password"
                  id="password"
                  v-model="password"
                  required
                />
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div v-for="(error, index) in errors" v-bind:key="index">
<h4 style="color:#ff3548;">{{error}}</h4>
              </div>
              
              <div class="row">
                <div class="center" style="margin:auto;">
                  <input
                    type="submit"
                    class="btn btn-primary btn-block btn-flat btnnice"
                    value="Log in"
                  />
                </div>
                <!-- /.col -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApiClient from "../services/api_client";

const MIN_USERNAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 4;

function validateUsername(form, username) {

  if (!username || username.length < MIN_USERNAME_LENGTH) {
    form.errors.push("Username required");
    return false;
  }

  return true;
}

function validatePassword(form, password) {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    form.errors.push("Password must be at least 4 characters long");
    return false;
  }

  return true;
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

      this.errors = [];

      if (
        !(
          validateUsername(this, this.username) &&
          validatePassword(this, this.password)
        )
      )
        return;

      const params = { username: this.username, password: this.password };
      const response = await ApiClient.post("auth/login", params, {
        noRedirectCodes: [401]
      });

      if (response.status === 200) {
        const {
          authorization: { token, user }
        } = await response.json();
        sessionStorage.setItem("apiKey", token);
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("userID", user.user_id);
        this.$store.commit('setUser', user);
        this.errors = [];
        this.$router.push("/");
      } else {
        this.errors.push("Invalid username or password");
        console.warn(`Response: ${response.status} - ${response.body}`);
        return;
      }
    }
  },
  created: function() {
    sessionStorage.clear();
    this.$store.user = null;
    ApiClient.getConfig();
  }
};
</script>
<style >
.btnnice {
  background: #76b3fa;
  border-radius: 100px;
  padding: 20px 60px;
  color: #fff;
  text-decoration: none;
  font-size: 1.45em;
  margin: 0 15px;
}
.inputnice {
  border-radius: 10px;
  text-decoration: none;
  font-size: 1.45em;
  /* margin: 0 15px; */
}
</style>

