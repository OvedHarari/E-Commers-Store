# All-In ! (E-Commerce-Store)

This project is a Full-stack application that was written on React-ts with node.js and designed with Bootstrap and SCSS.

## Project Description

The project is an e-commerce-store dedicated to delivering an unparalleled shopping experience.
The project is a Full-stack application react-typescript node.js.
On this site, users can navigate freely and need to register and log in to be able to pay and manage Wishlist as casual users and as Admin users they can manage users, block them or grant Admin permission to other users add, edit, and delete products.

### Users for testing:

1. Casual user - casual@test.com , password- 1q@W#E$R
2. Admin user - admin@test.com , password- 1q@W#E$R
3. If you will register with you Google account email, you will be able to use Google authentication in the next login.

### Basic functionality:

1. users can sign up as casual users or Admin users
2. password validation regex on signup/login.
3. 3 login attempts B4 lock.
4. client form validation using formik with yup.
5. server data validation using joi.
6. user profile image conditional rendering acording to gender (in case the user did not add image URL) + fatch google account image
7. Dark\Light mode support and responsive display.
8. Google Auth for Sign-in using passport (only after signing up).
9. Credit Card Payment. [Test Card Numbers](https://developers.bluesnap.com/reference/test-credit-cards)
10. Server requests logger to Termenal + Daily log file for errors only.

### Casual users functionality:

1. View products.
2. Add products to Wishlist.
3. Buy products.

### Admin users functionality:

1. All Casual users functionality is available.
2. Update\delete\ create new products
3. Additional Admin tab - to manage all existing users.
4. Update Users Details
5. Changing users role (casual/ Admin).
6. Block user from accessing the platform.
7. Delete Users.

## Getting Started:

### Installations

#### General information

- Clone the repository, open the code in a code editor and you will find three main folders:

1. backend - contains all backend functionality
2. frontend - contains all frontend functionality
3. MongoDB_Backup - contains all the required collections for MongoDB name \*e-commerce-store"\_

#### Frontend installation and requirements:

1. On the code editor - open a terminal and navigate to _"frontend"_ folder root.
2. Run 'npm install' to get all required node_modules for the frontend functionality.

#### Backend installation and requirements:

1. On the code editor - open a terminal and navigate to _"backend"_ folder root.
2. Run 'npm install' to get all required node_modules for the backend functionality.
3. DB connection -
   - DB_LOCAL:
   1. Restore all the collections available in folder _"MongoDB_Backup"_ to a DB named _"e-commerce-store"_ on your local MongoDB env.
   2. Set the _"MongoDB Connection string"_ in _"backend\.env"_ to use _"process.env.DB_LOCAL"_
   - DB_ATLAS:
   4. Set the _"MongoDB Connection string"_ in _"backend\.env"_ to use _"process.env.DB_ATLAS"_
   5. Make sure that in _"backend\.env"_ you update your Atlas connection string of the Atlas db in _"DB_ATLAS"_.

### Frontend environment variables (.env)

1. REACT_APP_API="http://localhost:7000/api"
2. REACT_APP_GOOGLE_MAPS_API_KEY="ADD_YOUR_GOOGLE_API_KEY"
3. GOOGLE_CLIENT_SECRET = "REPLACE YITH YOUR GOOGLE_CLIENT_SECRET"

- In case .env file does not exist, creae one in _"backend\"_ foot folder
- If you cannot create your own accounts/keys, contact Oved Harari at [ovedhar@gmail.com] with a request and I will considure providing.

### Backend environment variables (.env)

1. NODE_ENV=development
2. PORT = 7000
3. DB_ATLAS = "REPLACE WITH ATLAS CONNECTION STRING"
4. DB_LOCAL = "mongodb://127.0.0.1:27017/backend\.env"
5. jwtKey = "e-commerce-store"
6. GOOGLE_CLIENT_ID = "REPLACE WITH YOUR GOOGLE_CLIENT_ID"
7. GOOGLE_CLIENT_SECRET = "REPLACE WITH GOOGLE_CLIENT_SECRET"
8. CLIENT_URL = "http://localhost:3000"
9. SERVER_URL = "http://localhost:7000"

- In case .env file does not exist, creae one in _"frontend\"_ foot folder
- If you cannot create your own accounts/keys, contact Oved Harari at [ovedhar@gmail.com] with a request and I will considure providing.

### Starting the project

To get the project up and running, run the following in different Terminals

1. Terminal One: Navigate to _"backend"_ folder root and run _"nodemon start"_ (depanding on your intentions)
2. Terminal Two: Navigate to _"frontend"_ folder root and run _"npm start"_

## Authors

Oved Harari
[ovedhar@gmail.com](https://oved-harari-portfolio.netlify.app)

## Version History

- v1.0
