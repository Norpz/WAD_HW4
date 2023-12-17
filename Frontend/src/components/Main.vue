<script>
export default {
  props: ['postId'],

  computed: {
    post() {
      return this.$store.state.posts.find(post => post.id === this.postId);
    }
  },

  methods: {
    likePost() {
      this.$store.commit('incrementLikes', this.postId);
    }
  }
};
</script>

<template>
  <div class="post-container">
    <div class="post">
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
      <div class="likeDiv">
        <button @click="likePost">
          <img src="@/assets/like.png" class="like"  alt="like"/> <!-- Replace 'path_to_like_image.png' with your actual image path -->
        </button>
        <span>{{ post.likes }} Likes </span>
      </div>
    </div>
  </div>
</template>

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