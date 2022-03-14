# Project 2: Explore the Universe

## Description of App 
This app will ask you to sign up or login to your profile. After logging in you will be to see a home page were ther will be two links. One link will allow you to go to NASA's picture of the day where you will be able to put in a date and it will show you the picture of the day. The next link will be to a route allow you to see the weather of Mars. Then the user would be able to log out or go back to the home page.

## Install Instructions
* install the npm add ons `npm install`
* Now you would need to create a database and migrate it using: `sequelize create:db --name sf-auth -- attributes ` and `sequelize db:migrate`
* get an api key from https://api.nasa.gov/
* once you have an api key you need to make a .env file to store your api key `api_key=<your-api-key>`
* now you could run nodemon.
## Link to Deploy 
https://exploring-the-universe.herokuapp.com/
## User Stories
* As a user I want to be able to search a date and be able to see the picture of the day on that specific date
* As a user I want to be able to add these dates to a history tab where I could see the dates I have already used and be able to select date and delete them from the history.
## Explanation of Tech
We are going to be using npm packages such as express, ejs, ejs layouts, cookie-parser, env, crypto-js, and bcrypt in order to make a full stack website. We will be able to make routes using JS with the installed packages in order to allow the user to navigate through the website. I will also be using NASA's API's (APOD and Insight) 
## Wireframes
![profile](img/Page1.png)
![hisroty](img/Page3.png)
![signin/login](img/Page4.png)
## ERDs

![ERD](ERD.drawio.png)

## Restful Routes
| Method | Path | Purpose |
|:-------|:-----:|--------:|
|Comments Controller|
|**POST**|`/comments`|CREATES a new comment|
|**PUT**|`/comments/:id`|UPDATES a comment|
|**GET**|`/comments`|shows all the comments of the user|
|**GET**|`/comments/:id/edit`|shows form to edit comment|
|**DELETE**|`/comments/:id`|DELETES a comment|
|Images Controller|
|**GET**|`/images`|this is to show the image data from the api|
|**POST**|`/images`|post the image to the database|
|Users Controller|
|**GET**|`/user/profile`|shows all the images the user saved|
|**GET**|`/user/new`|render the new users/sign-up ejs file|
|**GET**|`/user/login`|login ejs file|
|**GET**|`/user/logout`|logs user out|
|**POST**|`/user`|checks if user is already in the database|
|**POST**|`/login`|login in user if credentials are correct|


## MVP's
* have a function site:
* login
* logout 
* CRUD  functions
* API used

## Post-Project
* be able to incorperate more apis and pages that the user can use.
* be able to leave messages about a specific picture.
* be able to style better.

## Sources
* api.nasa.gov
* Paulina Le - Office Hours
* paulina - office hours
* makeuseof.com
* stackoverflow.com