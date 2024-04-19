# Film Roulette

## The App

An hour into scrolling through streaming services to find the perfect film, I wished someone would come along and make the decision for me. Then I thought, an app could be that person.

Film Roulette takes away the burden of making the "right" choice as it taps into the mystical powers of the universe (the top 250 films on imDb) to bring the best companion film to the user (it's picked at random).

If the user wishes to sign up to the Film Roulette community, they can then save up to 10 of these films to curate a personal "must watch" list.

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
