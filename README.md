# Film Roulette

## The App

One hour deep into the endless scroll through streaming services, I found myself wishing for someone to make the decision for me. That's when inspiration struck: an app can be that person!

Introducing Film Roulette - an app designed to liberate users from the burden of choosing the "perfect" film. Harnessing the mystical powers of the universe (the top 250 films on IMDb), Film Roulette randomly selects the ideal cinematic companion for each user.

For those eager to join the Film Roulette community, the app offers the ability to save up to 10 of these chosen films, forming a curated "must-watch" list personalised to each user's taste.

## Project Goal

Filmd provided an opportunity to delve into full-stack development, relying minimally on peer assistance. The project was driven by several key objectives:

- Fostering confidence and proficiency in coding by immersing myself in a fully operational app's codebase.
- Embracing a rigorous learning journey with TypeScript, aiming to master a new language.
- Acknowledging the reality that external support may not always be available to overcome bugs and blockers, the project aimed to cultivate self-reliance, confidence, and perseverance.

# Set-up and Testing

## Installation

To download and initialise the project:

```js
$ git clone https://github.com/marinapapap/film-roulette
$ cd film-roulette
$ cd frontend
$ npm install
$ cd ..
$ cd api
$ npm install
```

Register and get an API key for the [IMDb-API](https://imdb-api.com/)

Register and get a database URI for [MongoDB](https://www.mongodb.com/)

Create a new .env file in the api folder:

```js
$ cd api
$ touch  .env
```

Copy the below code into the .env file and update:

```js
# .env

TOP_250 = "add your IMDb API key here"
JWT_SECRET = "add any random string here"
FRONT_END_URL = "http://localhost:3000"
MONGODB_URI = "add your MongoDB database URI here"
```

```js
$ cd ..
$ cd api
$ touch  .env
```

Copy the below code into the .env file and update:

```js
# .env

REACT_APP_API_URL = "http://localhost:8080"
```

## Using the App

From the main project directory...

Start running the front-end server:

```js
$ cd frontend
$ npm run start
```

Open a new terminal and start running the back-end server:

```js
$ cd api
$ npm run start
```

Open http://localhost:3000 to view and use the Film Roulette app in your browser.

# Technologies

Here's an overview of the technologies used to build the application.

- **M** - MongoDB
- **E** - Express
- **R** - React
- **N** - Node

Also used is...

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) for styling.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [Prettier](https://prettier.io) for code formatting.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [PostMan](https://www.postman.com) for testing http requests.

## Architecture

The application is comprised of two distinct pieces.

- A backend API built with Express
- A front end built with React

The React front end sends HTTP requests to the backend API.

### Api

[IMDb-API](https://imdb-api.com/) provides a number of endpoints that serve different purposes when sorting through the entire IMDb catalogue of film data. I use the endpoint that returns the current top 250 rated films.
