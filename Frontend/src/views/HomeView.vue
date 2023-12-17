<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div class="post-list" v-for="post in posts" :key="post.id">
      <div class="post">
        <h3>Title: {{ post.title }}</h3>
        <p><b>Body:</b> {{ post.body }}</p>
      </div>
    </div>
  </div>
  <button v-if="authResult" @click="AddPost" class="center">Add Post</button>
  <button v-if="authResult" @click="DeleteAll" class="center">Delete All</button>
</template>

<script>
import auth from "../auth";

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      authResult: auth.authenticated()
    };
  },
  methods: {
    async DeleteAll() {
      console.log("Deleted");
    },
    AddPost() {
      this.$router.push("/addpost");
    },
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include", // Don't forget to specify this if you need cookies
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log("jwt removed");
            this.$router.push("/login");
          })
          .catch((e) => {
            console.log(e);
            console.log("error logout");
          });
    },
    async fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/getposts", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status} - ${response.statusText}`);
        }

        const fetchedPosts = await response.json();
        this.posts = fetchedPosts;
      } catch (error) {
        console.error(error.message);
        // Add additional error handling or logging as needed
      }
    },
    async fetchAndInsertPosts() {
      try {
        const response = await fetch('http://localhost:3000/fetch-and-insert-posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch and insert posts');
        }

        // Posts fetched and inserted successfully
        console.log('Posts fetched and inserted successfully');
      } catch (error) {
        console.error('Error fetching and inserting posts:', error);
      }
    },
  },
  mounted() {
    this.fetchPosts(); // Fetch posts when the component is mounted
    this.fetchAndInsertPosts();
  },
};
</script>

<style scoped>
body{
  margin: 20px 40px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  background: #fafafa;
  position: relative;
}
.post-list{
  background: rgb(189, 212, 199);
  margin-bottom: 5px;
  padding: 3px 5px;
  border-radius: 10px;
}
h3{
    margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #444;
  background: #7e9756;
}
p{
  background: #796dbd;
}
h1, h2, h3, h4, ul, li, a, input, label, button, div, footer{
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #444;
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 80px;
}
input{
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
label{
  display: block;
  margin: 20px 0 10px;
}
button{
  margin-top: 30px;
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}
nav{
  display: flex;
  align-items: center;
}
.post {
    width: 80%;
    position: relative;
    padding: 10px;
    margin: 10px auto;
    border: 1px solid gray;
    text-align: left;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  margin: 10px auto;
  width: 30%; 
}
.container {
  display: flex;
  justify-content: center;
}
</style>