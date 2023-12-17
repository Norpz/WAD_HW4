<script>
// @ is an alias to /src
import AddPost from '@/components/AddPost.vue'

export default {
  name: 'AddPostView',
  components: {
    AddPost
  }
}
</script>

<template>
  <div class="addPost">
    <AddPost msg="Welcome to Your Vue.js App"/>
  </div>
</template>