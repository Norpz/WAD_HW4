<template>
  <div class="signup">
    <form class="loginForm">
      <div class="formHeader">
        <p><strong>Welcome to RAM OÜ</strong></p>
      </div>
      <div class="formBody">
        <p>Address: Nooruse 1, Tartu</p>
        <p>Phone: 545 41 010</p>
        <p>Email: laivi@tuvahe.ut.ee</p>
        <p>Fax: 6594 0012</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactsView",
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

@media (min-width: 600px) {
  .loginForm {
    display: flex;
    flex-direction: column;
  }
}
</style>
