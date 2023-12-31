const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented  
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}




app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

// Endpoint to fetch data from the 'posts' table
app.get('/auth/getposts', async (req, res) => {
    try {
        const posts = await pool.query('SELECT * FROM posts'); // Modify the query as needed

        res.status(200).json(posts.rows); // Sending the retrieved data as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});


app.post('/auth/posts', async (req, res) => {
    try {
        const { title, author, create_time, content, image_url} = req.body;

        const newPost = await pool.query(
            'INSERT INTO posts (title, author, create_time, content, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, create_time, content, image_url]
        );

        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/auth/addPost', async (req, res) => {
    try {
        const { title, content, image_url, imageauthor_url } = req.body;
        let { author } = req.body;

        // If author is not provided in the request body, set it as "anonymous"
        if (!author) {
            author = 'User';
        }

        // Obtain the current timestamp in ISO format
        const currentTimestamp = new Date().toLocaleString(); // Convert to local date and time

        const newPost = await pool.query(
            'INSERT INTO posts (title, author, create_time, content, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, currentTimestamp, content, image_url]
        );

        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

const fetch = require('node-fetch');

// Endpoint to fetch data from JSON and insert into the 'posts' table
// Endpoint to fetch data from JSON and insert into the 'posts' table
app.post('/auth/fetch-and-insert-posts', async (req, res) => {
    try {
        const response = await fetch('https://api.npoint.io/310271b6e51d1b11206b');
        if (!response.ok) {
            throw new Error('Failed to fetch data from the JSON API');
        }

        const jsonData = await response.json();
        const currentTimestamp = new Date().toLocaleString(); // Convert to local date and time

        // Insert each post from the JSON data into the 'posts' table
        for (const post of jsonData) {
            const {title, author, create_time, content, image_url} = post;
            await pool.query('INSERT INTO posts (title, author, create_time, content, image_url) VALUES ($1, $2, $3, $4, $5)', [title, author, currentTimestamp, content, image_url]);
        }

        res.status(200).json({message: 'Posts fetched and inserted successfully'});
    } catch (error) {
        console.error('Error fetching and inserting posts:', error);
        res.status(500).json({error: 'Failed to fetch and insert posts'});
    }
});

app.delete('/auth/delete-all-posts', async (req, res) =>{
    try {
        await pool.query('DELETE FROM posts'); // Deletes all rows from the 'posts' table

        res.status(200).json({ message: 'All posts deleted successfully' });
    } catch (error) {
        console.error('Error deleting posts:', error);
        res.status(500).json({ error: 'Failed to delete posts' });
    }
});

app.delete("/deleteposts/:postId", async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Query the database to delete the post based on postId
      const deletedPost = await yourDatabaseQueryToDeletePost(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Function to delete a post from the database based on postId
const yourDatabaseQueryToDeletePost = async (postId) => {
    const client = await pool.connect();
    try {
      // Start a transaction
      await client.query('BEGIN');
  
      // Perform the delete operation
      const deleteQuery = 'DELETE FROM posts WHERE id = $1 RETURNING *';
      const result = await client.query(deleteQuery, [postId]);
  
      // Commit the transaction
      await client.query('COMMIT');
  
      // Return the deleted post
      return result.rows[0];
    } catch (error) {
      // Rollback the transaction in case of an error
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  };


  app.put("/updateposts/:postId", async (req, res) => {
    const postId = req.params.postId;
    const updatedContent = req.body.content; // Adjust based on your data structure
    
    try {
      // Query the database to update the post based on postId
      const updatedPost = await yourDatabaseQueryToUpdatePost(postId, updatedContent);
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  const yourDatabaseQueryToUpdatePost = async (postId, updatedContent) => {
    const client = await pool.connect();
    const currentTimestamp = new Date().toLocaleString(); // Convert to local date and time
  
    try {
        // Start a transaction
        await client.query('BEGIN');

        // Perform the update operation
        const updateQuery = 'UPDATE posts SET content = $1, create_time = $2 WHERE id = $3 RETURNING *';
        const result = await client.query(updateQuery, [updatedContent, currentTimestamp, postId]);

        // Commit the transaction
        await client.query('COMMIT');

        // Return the updated post (check if rows exist before accessing the first element)
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        // Rollback the transaction in case of an error
        await client.query('ROLLBACK');
        throw error;
    } finally {
        // Release the client back to the pool
        client.release();
    }
};


  app.get("/posts/:postId", async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Query the database to get the post details based on postId
      const post = await yourDatabaseQueryToFetchPost(postId);
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  async function yourDatabaseQueryToFetchPost(postId) {
    const query = 'SELECT * FROM posts WHERE id = $1';
    const values = [postId];
  
    try {
      const result = await pool.query(query, values);
  
      // Check if a post was found
      if (result.rows.length === 0) {
        return null; // Post not found
      }
  
      // Return the first row (assuming postId is unique)
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching post from the database:', error);
      throw error; // Propagate the error
    }
  }

