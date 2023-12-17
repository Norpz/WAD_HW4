<script>
export default {
  name: 'AddPost',
  props: {
    msg: String
  }
}
</script>

<template>
  <body class="addPost">
  <form class="addPostForm" action="index.html" method="POST" id="postForm">
    <div>
      <label for="textarea">Post body   </label>
      <textarea id="textarea" name="textarea" placeholder="textarea" rows="4" cols="20"></textarea>

    </div>
    <div class="selectFile">
      <input type="file" id="fileInput" name="file" accept="image/png, image/jpeg">
      <label for="fileInput" class="custom-file-input"><strong>Select a file</strong></label>
    </div>
    <div>
      <br>
      <button type="submit" class="createPost">Create post</button>
    </div>
  </form>
  </body>
</template>

<style scoped>
*{
  box-sizing: border-box;
  font-family: sans-serif;
}



.addPost form{
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

.addPostForm{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#fileInput{
  display: none;
}

.custom-file-input, .createPost{
  display: inline-block;
  padding: 3px 10px;
  margin-top: 20%;
  font-size: 13px;
  cursor: pointer;
  background-color:white;
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