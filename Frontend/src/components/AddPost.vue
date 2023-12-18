<template>
  <body class="addPost">
  <form class="addPostForm" @submit.prevent="AddPost" id="postForm">
    <div>
      <label for="textarea">Post body </label>
      <textarea v-model="postBody" id="textarea" name="textarea" placeholder="textarea" rows="4" cols="20"></textarea>
    </div>
    <div>
      <br>
      <button v-if="authResult" type="submit" class="createPost">Add Post</button>
    </div>
  </form>
  </body>
</template>

<script>
import auth from "../auth";

export default {
  name: "AddPost",
  data() {
    return {
      postBody: '',
      authResult: auth.authenticated()
    };
  },
  methods: {
    async AddPost() {
      try {
        const response = await fetch('http://localhost:3000/auth/addPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.postBody // Sending the post body in the request
            // Include other properties such as title, author, create_time, etc. if needed
          })
        });
        if (!response.ok) {
          throw new Error('Failed to add post');
        }
        console.log('Post added successfully');
        this.goToPostPage();
        // Redirect to the post page after successful addition of the post
        this.goToPostPage();
      } catch (error) {
        console.error('Error adding post:', error);
      }
    },
    goToPostPage() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: sans-serif;
}

.addPost form {
  padding: 15px 15px;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 50px;
  background-color: #FFF2D8;
  text-align: center;
  box-shadow: 0px 0px 14px 0px #EAD7BB;
  border-radius: 15px 15px 15px 15px;
}

div button {
  margin: 5px;
  margin-bottom: 15px;
  padding: 0 10px;
  text-align: center;
  font: bold 14px/25px Arial, sans-serif;
}

textarea {
  resize: none;
  text-align: left;
  vertical-align: top;
}

input[type='file'] {
  color: rgba(0, 0, 0, 0)
}

.addPostForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#fileInput {
  display: none;
}

.custom-file-input, .createPost {
  display: inline-block;
  padding: 3px 10px;
  margin-top: 20%;
  font-size: 13px;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 3px;
}


@media (min-width: 600px) {
  .addPost {
    display: flex;
    flex-direction: column;
  }

}
</style>