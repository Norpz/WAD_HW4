<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div class="post-list" v-for="post in posts" :key="post.id">
      <div class="post" @click="goToPostPage">
        <div class="user-profile">
          <img :src="post.imageAuthor_url" alt="User Profile Picture" v-if="post.imageAuthor_url" />
          {{ post.author }}
        </div>
        <div class="date">
          {{ post.create_time }}
        </div>
        <p>{{ post.content }}</p>
        <div class="post-image">
          <img :src="post.image_url" alt="Post Image" class="post-image" v-if="post.image_url" />
        </div>
      </div>
    </div>
  </div>
  <button v-if="authResult" @click="AddPost" class="center">Add Post</button>
  <button v-if="authResult" @click="DeleteAll" class="center">Delete All</button>
  <button v-if="authResult" @click="CreatePosts" class="center">Create Posts</button>
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
    goToPostPage(){
      this.$router.push("/postpage");
    },
    async CreatePosts(){
      try {
        const response = await fetch('http://localhost:3000/auth/fetch-and-insert-posts', {
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
        window.location.reload();
        console.log('Posts fetched and inserted successfully');
      } catch (error) {
        console.error('Error fetching and inserting posts:', error);
      }
    },
    async DeleteAll() {
      try {
        const response = await fetch('http://localhost:3000/auth/delete-all-posts', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Include any additional headers if needed (e.g., authorization headers)
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete posts');
        }

        const data = await response.json();
        console.log(data.message); // Log the success message
        window.location.reload();
      } catch (error) {
        console.error('Error:', error.message);
      }
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
        const response = await fetch("http://localhost:3000/auth/getposts", {
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
  },
  mounted() {
    this.fetchPosts(); // Fetch posts when the component is mounted
  },
};
</script>

<style scoped>
*{
  box-sizing: border-box;
  font-family: sans-serif;
}

div button {
  margin: 5px;
  margin-bottom: 15px;
  padding: 0 10px;
  text-align: center;
  font: bold 14px/25px Arial, sans-serif;
}


.post-container {
  margin: 20px;
  text-align: center;
}

.post {
  border: 1px solid #EAD7BB;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
  background-color: #EAD7BB;
  max-width: 500px;
  margin: auto;
  border-radius: 20px 20px 20px 20px;
  margin-top: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #BCA37F;
  border:1px solid #BCA37F;
  padding: 10px;
  border-radius: 20px 20px 20px 20px;
}

.user-profile img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-image img {
  width: 100%;
  display: block;
  margin-bottom: 10px;
}

.caption {
  font-size: 16px;
  text-align: left;
}

.date {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: small;
  background-color: #dfcdb4;
  border: 1px solid #dfccb1;
  padding: 1px 5px;
  border-radius: 0px 15px 0px 15px;
}


.likeDiv {
  text-align: right;
}

.like {
  width: 7%;
  height: 7%;
  border-radius: 50%;
  margin-right: 10px;
}

@media (min-width: 600px) {
  .post-container {
    display: flex;
    flex-direction: column;
  }
}

</style>