# Smunch Technical Assignment
## Installation
### Prerequisites: 
1. Insure yarn is installed on your machine.
2. This application itself was designed to mainly be run on a Linux, WSL or equivalent OS/System but can be run in docker.

### Run outside of Docker
- Clone repo
- Install dependencies: `yarn install`
- Build app:
  - Development version (quicker build) run `yarn dev_build`
  - Production version run (app loads quicker after build) `yarn prod_build`
- Run `MONGO_URI=<mongo_uri> PORT=8080 yarn start`
- Open browser [here](http://localhost:8080/)

### Run Docker stack
- Clone repo
- Run either (both will setup MongoDB and run the app):
  - The development build version: `yarn docker_dev`
  - The production build version: `yarn docker_prod` 
- Open browser [here](http://localhost:8080/)

## Usage
`Note:` You can navigate back to the home page by clicking the title at the top left of the page.
### Add Restaurant Review
1. Click the `Add Review` button next to the `Comments` section title.
2. Enter the `Title`, `Comment` and select a star `Rating`.
3. Click `Confirm` and the page will reload with the new comment.

### Add Product Review
1. Click any product under a restaurant and will navigate to the product details page.
1. Click the `Add Review` button next to the `Comments` section title.
2. Enter the `Title`, `Comment` and select a star `Rating`.
3. Click `Confirm` and the page will reload with the new comment.

## Explanations
During this assignment, I had to restrict the scope of the assignment, because of time constraints from other activities I needed to do and computer failures I experienced. I will explain the important design choices in this section.

### Choosing a non-relational database
I have mainly experience in MongoDB databases with some knowledge of SQL and Postgres. So I used MongoDB and Mongoose to help speed up the development process.

MongoDB however does have some relational-like functionality with the use of [refs.](https://mongoosejs.com/docs/populate.html) This allows me to link multiple collections (like tables) together by just storing the `_id` field of the document from another collection (kind of like a primary key). When I go to return the document I can use the `populate()` function to get the data from the document in a collection that contains the same `_id`. This allows the separation of data structures and reduces duplication of data.

Another useful feature of MongoDB/Mongoose is the virtual type properties which act as calculated fields. These properties are not stored but are returned whenever the document is retried. This was used to calculate the `average rating` for each restaurant or product every time it was requested. This ensured that the property always used the latest values.

### Using React-router over Remix
For the same reason I used MongoDB, I did not have much time for this project and I had more experience with React-router, Single Page Applications (SPA) and client-side rendered code. 

React-router is better suited for SPAs or client-side rendering with functions like `createBrowserRouter` which allows an application to remain a SPA but have similar logic handling/separation to a multi-page application. This also allowed the back-end section of the code to remain mostly unchanged and not have to implement the Remix handler to render the pages and not have to further implement the build handling of Remix alongside the current bundling with Webpack.

Using React-router allowed me to complete this assignment on time.

### Elastic UI (EUI)
This is a UI library that I have a lot of experience in, as it can make an app look beautiful with minimal effort. It helped a lot with development and made it easier to implement models, comments and page layouts.

### Further Improvements
There are a lot of things I would like to further improve the application if I had time to do so.

- Add test suite.
- Add validation for requests and forms, using Joi or something similar.
- Use React-hook-form or similar libraries to handle form logic (such as reviews), to handle common form logic.
- Add the ability to add a username to reviews / or create a user account.
- Delete and edit reviews.
- Upload images with reviews.
- Better UI layout. 
- Add search and filter functionality for restaurants and products.
- Add a google maps location display for a restaurant and other realistic data such as an address, phone number or email.
- Consolidate some duplication in parts of the code, such as adding a review to a product or restaurant.
- Add more debug logs in the code and error checks.
