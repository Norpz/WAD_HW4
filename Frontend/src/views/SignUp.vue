
    <button @click="SignUp" class="SignUp">SignUp</button>

<template>
  <div class="signup">
    <form class="loginForm" @submit.prevent="submitForm">
      <div class="formHeader">
        <p><strong>Welcome to RAM OÜ</strong></p>
        <p>Sign up with your email and password</p>
      </div>
      <div class="formBody">
        <label for="email">Email </label>
        <input type="text" name="email" placeholder="Email" required v-model="email">
        <br><br>
        <label for="password">Password </label>
        <input type="password" id="password" placeholder="Password" required v-model="password" @input="validatePassword">

      </div>
      <div>
        <br>
<!--        <button type="submit">Signup</button><br>-->
        <button @click="SignUp" class="SignUp">SignUp</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
name: "SignUp", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


SignUp() {
  console.log('SignUp button clicked');
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      this.$router.push("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }, 
  }
</script>

<style scoped>
*{
  box-sizing: border-box;
  font-family: sans-serif;
}
ul{
  list-style: none;
}
.signup{
  line-height: 1.6;
  margin: 50px;
  min-width: 300px;
  background-color: #FFF2D8;
  border-radius: 10px;
}

.login form{
  padding: 10px 15px;
  margin-left: 5%;
  margin-right: 5%;
  background-color: #baf3f8;
  text-align: center;
  box-shadow: 0px 0px 14px 0px rgba(85, 255, 215, 0.75);
  border-radius: 15px 15px 15px 15px;
}
div button {
  margin: 5px;
  margin-bottom: 15px;
  padding: 0 10px;
  text-align: center;
  font: bold 14px/25px Arial, sans-serif;
}

.loginForm a{
  font: bold 16px/30px Arial, sans-serif;
  color: rgb(0, 13, 191);
}


.validation-message {
  margin-top: 10px;
  color: red;
}

@media (min-width: 600px) {
  .loginForm {
    display: flex;
    flex-direction: column;
  }
}
</style>