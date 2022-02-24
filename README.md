# philosophyHQ

By: Maxim Grigg

Live-Link: https://philosophyq.herokuapp.com/

PhilosophyHq is a full stack application using PSQL, Express.js in the backend, and React.js in the frontend.
The application allows useres to interact with famous philosphers, dead and alive, by reading tweets, reading tweet replys, as well as 
creating, editing, and deleting tweets and replies. 

On the FrontEnd:
React:
React was used to handle all frontend logic and design. 

Redux:
Redux is used to handle all state management by use of actions and thunks making API calls to the backend for data from the server. 

CSS:
All styling was done with the use of vanilla CSS. 

On the Backend:
Express.js:
Express.js was used to make the API's and connect the data base to the front end for a smooth user experience. 

PostgresSQL:
PostgresSQL was the database used to build seeder files and easily manage database constarinsts and customization. 

Sequelize:
All table management and data was managed with the use of sequelize. 

Next Steps:
While I am happy with the overall design and feel of PhilosophyHQm I plan to implement more features going forward. I plan to implement
likes, follows, search, and users pages. As well as possibly creating an ecommerce portion for the philosphers to sell their favorite books. 

How to download and launch the app:
Clone the code.

In the backend folder, initialize the server's package.json by running npm init -y.

npm install the following packages as dependencies:

bcryptjs - password hashing cookie-parser - parsing cookies from requests cors - CORS csurf - CSRF protection dotenv - load environment variables into Node.js from a .env file express - Express express-async-handler - handling async route handlers express-validator - validation of request bodies faker - random seeding library helmet - security middleware jsonwebtoken - JWT morgan - logging information about server requests/responses per-env - use environment variables for starting app differently pg@">=8.4.1" - PostgresQL greater or equal to version 8.4.1 sequelize@5 - Sequelize sequelize-cli@5 - use sequelize in the command line npm install -D the following packages as dev-dependencies:

dotenv-cli - use dotenv in the command line nodemon - hot reload server backend files.

In the backend folder, create a .env file that will be used to define your environment variables.

Populate the .env file based on the example below:

PORT=5000 DB_USERNAME=auth_app DB_PASSWORD=«auth_app user password» DB_DATABASE=auth_db DB_HOST=localhost JWT_SECRET=«generate_strong_secret_here» JWT_EXPIRES_IN=604800

Use the create-react-app command from inside your frontend folder to initialize React inside of the frontend folder:

npx create-react-app . --template @appacademy/react-redux-v17 --use-npm You will also need to install js-cookie as a dependency to continue. This dependency will allow your frontend to extract cookies from the browser.

npm install js-cookie

Create a local database with sequelize.

That database should have the following items and associations:

# Users
| Column name | Date type | Details |
|------------ |-----------|---------|
| id | int | not null, primary key |
| username | string | not null, unique |
| email | string | not null, unique |
| imgUrl| string | 
| bio| text | 
| hashed_password|string| not null| 
|createdAt |timestamp|
|updatedAt |timestamp|


# Tweets
| Column name | Date type | Details |
|-------------|-----------|---------|
| id | int | not null, primary key |
| userId | int | not null |
| imgUrl | string | 
|tweet |text|not null|
|createdAt |timestamp|
|updatedAt |timestamp|

* userId references Users table

# Comments
| Column name | Date type | Details |
|-------------|-----------|---------|
|id |int|not null, primary key|
|userId|int|not null|
|tweetId|int|not null|
|comment|text|not null|
|createdAt |timestamp|
|updatedAt |timestamp|

* userId references Users table
* tweetId references Tweets table

Conclusion: 
I hope you have enjoyed this application as much as I enjoyed making it. If you have any questions or would like to chat, please reach out to me on github or 
on linkedin: https://www.linkedin.com/in/maxim-grigg-42a4451a9/.
