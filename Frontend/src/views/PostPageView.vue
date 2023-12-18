<template>
  <div class="post">
    <div class="user-profile">
      {{ this.$route.query.postAuthor }}
    </div>
    <div class="date">
      {{ this.$route.query.postCreateTime }}
    </div>
    <p>{{ this.$route.query.postContent }}</p>
    <div class="post-image">
      <img :src="this.$route.query.postImgUrl" alt="Post Image" class="post-image" v-if="this.$route.query.postImgUrl" />
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "PostPageView",
    props: {
      postId: String,
      postContent: String,
      postAuthor: String,
      postCreateTime: String,
      postImgUrl: String,
    },
    methods: {
      updatePost() {
      // Implement logic to update the post in the database
      // You may want to navigate the user to an update form or use a modal
    },
    deletePost() {
      // Implement logic to delete the post from the database
    },
    }
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