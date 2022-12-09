# FootyChat

![FootychatPreviews](https://user-images.githubusercontent.com/105861220/206741959-b47c5be2-4636-474f-aaaf-b8d23ecc542c.png)

FootyChat allows users to organise friendly football games within communities. It replaces the need for numerous football chats across various messaging platforms with its own chat functionality, specifically for football. 

Users can create games and then send a message to see if anyone is available to play. The app can also automate team selection based on information submitted during the onboarding stage of sign up.

## Getting started

### You can view a live demo of this project at [adopet.live](https://adopet.live)

or run it locally following the steps below:

### Front end

#### Environment variables

- **VITE_API_URL**: URL to the back end API p.e. http://localhost:4000/api
- **VITE_GOOGLE_MAPS_API_KEY**: Google Maps API Key
- **VITE_GOOGLE_CLIENT_ID**: Client ID of your Google OAuth application
- **VITE_GOOGLE_CLIENT_SECRET**: Client secret of your Google OAuth application

#### Running the app

First of all you have to install node dependencies

```bash
npm i
```

Then run the app

```bash
npm run dev
```

Your app by default should be running in http://localhost:5173/

### Back end

#### Environment variables

- **PORT:** The port the server will run in

- **DATABASE_URL:** The connection URL for the database (only tested in postgres and it has to be a SQL DB). If you're running the postgres container declared in docker-compose this must be "postgres://postgres:postgres@postgres:5432/adopet"

- **TOKEN_KEY:** The key that will be used to encrypt the tokens

- **ENVIRONMENT:** The environment the app is in (production or development)

- **GOOGLE_SECRET:** Client secret of your Google OAuth application

- **GOOGLE_EMAIL**: The email of the owner of your Google OAuth application

##### Testing

- **ADMIN_TOKEN:** The admin token in the database

- **GOOGLE_TOKEN:** Token for an existing google account in the database

- **GOOGLE_TOKEN_NON_EXISTING:** Token for a non existing google account in the database

- **GOOGLE_USER_ID**: Google ID to create an account with

#### Running the app

First of all you have to install node dependencies

```bash
npm i
```

Then run the app

```bash
npm run docker:compose
```

Your app by default should be running in [http://localhost:[ENV-PORT]/]

# Tech Stack
- React Native
- MongoDB
- Koa
- Sockets.io



