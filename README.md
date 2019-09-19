# Project Mercury

Project Mercury is a web application for creating and tracking PCNs (Product Change Notifications). Administrators will be able to create users and approve PCN requests. Product Managers will use one of the existing templates to submit a PCN for approval and publication. Users can then search for and view PCNs.

The goal is to streamline and standardize the PCN creation process, while providing a user-friendly experience for locating and viewing the PCNs.

This version uses AWS, Material UI, Javascript, React, Redux, Node.js, Express.js, PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [postico] https://eggerapps.at/postico/
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [AWS] is not necessary to run the app but will be needed for photo upload
## Create database and table

Create a new database called `project-mercury` and Add the sql code from the `databse.sql` file in the project code and execute the statements it. This will get your database setup correctly.


## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum. 

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. [Import the sample routes JSON file](./PostmanPrimeSoloRoutes.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
    1. `POST /api/user/register` registers a new user, see body to change username/password
    2. `POST /api/user/login` will login a user, see body to change username/password
    3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App
* `redux/` contains all reducers and sagas


## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

# AWS Steps


Links:
Create AWS Account: 
    https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/
Create S3 Bucket:
    https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html
Authenticate User:
    https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example1.html


1. Create FREE AWS Account.

2. Follow the link above to create an S3 Bucket.

3. Use the link under Authenticate User to create User and authorize access to the Bucket.

4. Create an .env file in the repo and create a variable called S3_BUCKET and set it to the name of your bucket, another variable called AWS_ACCESS_KEY_ID1 and set it to the user's access key, and a last variable called AWS_SECRET_ACCESS_KEY1 and set it to the user's secret access key.

5. Test an upload to see if it goes to the bucket.

### Completed Features

High level list of items completed.

-  Feature A
	Search documents by pcn number and part number
-  Feature B
CreateNPI, PCN, and EOL documents.
-  Feature C
Admin can create users 
-  Feature D
Admin approves or denies PCNs 
-  Feature E
Admin approves or denies PCNs 


## Authors

- David Reeves
- Mark McNally 
- Mitch Olson
- Blake Peterson

