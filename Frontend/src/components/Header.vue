<script>
    export default {
    name: 'Header',
    }
</script>

<template>
    <header>
<!--        <router-link to="/">Signup</router-link>-->
        <router-link to="/">Home</router-link>
        <router-link to="/contacts">Contacts</router-link>
    </header>

</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  padding-left: 2%;
  padding-right: 2%;
  background-color:#ecd3ae;;
  box-shadow: 0px 0px 14px 0px #EAD7BB;
  text-align: left;
  font-size: 25px;
  border-radius: 15px 15px 15px 15px;
}

header a {
  color: #113946;
  text-decoration: none;
  cursor: pointer;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}

header a.router-link-exact-active {
  color: #113946;
  text-decoration: none;
  cursor: pointer;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}
</style>