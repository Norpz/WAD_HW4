<template>
  <div class="signup">
    <form class="loginForm" @submit.prevent="submitForm">
      <div class="formHeader">
        <p><strong>Welcome to RAM OÜ</strong></p>
        <p>Login</p>
      </div>
      <div class="formBody">
        <div class="inputField">
          <label for="email">Email</label>
          <input type="text" name="email" placeholder="Email" required v-model="email">
        </div>
        <div class="inputField">
          <label for="password">Password</label>
          <input type="password" name="password" placeholder="Password" required v-model="password">
        </div>
      </div>
      <div class="container">
        <button @click="LogIn" class="center">LogIn</button>
        <button @click='this.$router.push("/signup")' class="center">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
name: "LogIn", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
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
      //this.$router.push("/");
      location.assign("/");
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
  padding: 8px 16px; /* Adjust padding for better appearance */
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Use a modern font */
  border: none;
  border-radius: 4px;
  background-color: #aa8f38; /* Button background color */
  color: #ffffff; /* Text color */
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

div button:hover {
  background-color: #bfba5e; /* Change background color on hover */
}

.inputField {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.inputField label {

  width: 100%; /* Adjust the width as needed */
  /*margin: 0px; /* Center the input boxes */
  padding: 8px;
  font-weight: bold;
  margin-bottom: 5px;
}

.inputField input[type="text"],
.inputField input[type="password"] {
  width: 20%; /* Adjust the width as needed */
  margin: 0 auto; /* Center the input boxes */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  box-sizing: border-box; /* Include padding and border in the width */
}

.inputField input[type="text"]:focus,
.inputField input[type="password"]:focus {
  outline: none;
  border-color: #bfba5e; /* Change border color on focus */
}

.loginForm a{
  font: bold 16px/30px Arial, sans-serif;
  color: rgb(0, 13, 191);
}

@media (min-width: 600px) {
  .loginForm {
    display: flex;
    flex-direction: column;
  }
}
</style>
