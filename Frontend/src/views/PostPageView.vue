<template>
  <div class="post">
    <div class="user-profile">
      {{ postData.author }}
    </div>
    <div class="date">
      {{ postData.create_time }}
    </div>
    <textarea v-model="updatedContent" rows="4" cols="50" :placeholder="postData.content"></textarea>
    <div class="post-image">
      <img :src="postData.image_url" alt="Post Image" class="post-image" v-if="postData.image_url" />
    </div>
  </div>
  <button @click="updatePost">Update</button>
  <button @click="deletePost">Delete</button>
</template>
  
  <script>
  export default {
    name: "PostPageView",
    props: {
      postId: String,
    },
    data() {
      return {
        postData: {
          postContent: "",
          postAuthor: "",
          postCreateTime: "",
          postImgUrl: "",
        },
        updatedContent: "",
      };
    },
    mounted() {
      this.fetchPostDetails();
    },
    methods: {
    updatePost() {
      const postId = this.postId;

      fetch(`http://localhost:3000/updateposts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: this.updatedContent,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update post: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          // Optionally, you can navigate the user back to the homepage or perform other actions
          console.log(data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error('Error:', error.message);
          // Handle the error as needed
        });
    },

    deletePost() {
      // Implement logic to delete the post from the database
      const postId = this.postId;

      fetch(`http://localhost:3000/deleteposts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete post: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          this.$router.push("/");
          console.log(data.message); // Log the success message
          // Optionally, you can navigate the user back to the homepage or perform other actions
        })
        .catch((error) => {
          console.error('Error:', error.message);
          // Handle the error as needed
        });
    },

    async fetchPostDetails() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${this.postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch post details: ${response.status} - ${response.statusText}`);
        }

        this.postData = await response.json();
        console.log("Fetched post data:", this.postData);
      } catch (error) {
        console.error(error.message);
        // Handle the error as needed
      }
    },
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
  
  @media (min-width: 600px) {
    .post-container {
      display: flex;
      flex-direction: column;
    }
  }
  
  </style>