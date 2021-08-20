# Blog REST API

A **Node/Express** REST API for creating personal blogs.

## Overview

Blog API created with [NodeJS](https://nodejs.dev/), [Express](https://expressjs.com/) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

The code for the frontend of this project can be veiwed [here](https://tynasello-express-library.herokuapp.com/catalog), and the live demo [here](https://tynasello-express-library.herokuapp.com/catalog).

API supports personal blogs with admin-only features, including creating, deleting and editing posts, aswell as deleting comments.

**JWT**'s were used to authenticate users, allowing login functionality and access to protected routes.

API deployed with [Heroku](https://www.heroku.com).

## What I've Learned

> How to create fully functional REST APIs.
>
> How to recieve GET, POST, DELETE and PACTH JSON data through HTTP requests.
>
> How to organize API routes and controllers in a RESTful manner.
>
> How to use the bcrypt library to safely hash and compare sensitive information such as passwords.
>
> How to authenticate users and allow access to proteced routes using JSON web tokens

## Installation

To Work on this project:

Clone project:

```bash
git clone https://github.com/Tynasello/blog-api
```

Change into project directory:

```bash
cd blog-api
```

Install required dependencies:

```bash
npm install
```

To run the app in development mode with nodemon:

```bash
npm run devstart
```

Add the two following environment varibales in your .env file:

```
MONGO_URI - for connection to Mongo db
ACCESS_TOKEN_SECRET - to authenticate requests
```

If deploying application with Heroku, you must also run the following two commands:

```bash
heroku config:set MONGODB_URI=<Your Mongo URI>
heroku config:set ACCESS_TOKEN_SECRET=<Your access token secret>

```

## API Routes

List of available routes

Routes can be accessed through the following URL: 'https://tynasello-blog-api.herokuapp.com/blog/'

An asterisks (\*) before method types signifies protected routes. **x-access-token** must be passed in request header to access these routes

### Auth

| Method | URI      | Decription               |
| ------ | -------- | ------------------------ |
| POST   | /sign-up | Sign up                  |
| POST   | /log-in  | Log in                   |
| DELETE | /logout  | Log out                  |
| \*GET  | /user    | Currently logged in user |

### Posts

| Method   | URI        | Decription        |
| -------- | ---------- | ----------------- |
| GET      | /posts     | All posts         |
| GET      | /posts/:id | Single post by id |
| \*POST   | /posts     | Create post       |
| \*DELETE | /posts/:id | Delete post by id |
| \*PATCH  | /posts/:id | Edit post by id   |

### Comments

| Method   | URI                                 | Decription               |
| -------- | ----------------------------------- | ------------------------ |
| GET      | /posts/:postid/comment              | All post comments        |
| GET      | /posts/:postid/comments/:commentid  | Single comment by id     |
| POST     | /posts/:postid/comments             | Create comment           |
| \*DELETE | //posts/:postid/comments/:commentid | Delete comment by id     |
| \*DELETE | /posts/:postid/comments             | Delete all post comments |
| \*PATCH  | /posts/:postid/comments/:commentid  | Edit comment by id       |

I tested these routes using the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VSCode extension. Any rest client such as [Postman](https://www.postman.com/) can also be used.

## Example Route Requests

```bash
const req = await fetch(
    `https://tynasello-blog-api.herokuapp.com/blog/log-in`,
    {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    }
);
const result = await req.json();
localStorage.setItem("token", result.token);

```

#### Creating Post

```bash
await fetch(`https://tynasello-blog-api.herokuapp.com/blog/posts/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token") || " ",
    },
    body: JSON.stringify({
        title: newTitle,
        author_name: newAuthor,
        text: newText,
    }),
});
```

## Built With

- [NodeJS](https://nodejs.dev/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Heroku](https://www.heroku.com/home)

## Acknowledgments

Inspiration for this project was found while following the tutorials on [The Odin Project](https://www.theodinproject.com), and advancing to the [NodeJS Project: Blog API](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/blog-api) section.

```

```
