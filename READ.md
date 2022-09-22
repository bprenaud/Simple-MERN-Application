# Simple-MERN-Application

A simple MERN Application that allows you to register, login and logout.

## About This App

### Background

This application was built from Brad Traversy's **MERN Stack Front To Back: Full Stack React, Redux and Node.js**. Check out his GitHub repo [here](https://github.com/bradtraversy/devconnector_2.0.git) for the full project and updates.

### Setup

1. In order to setup this application in your local environment you will first need to clone the repo.
2. Second, insert your mongodb URI in the [keys.js](https://github.com/bprenaud/Simple-MERN-Application.2/blob/React/config/keys.js).
   Here is the [MongoDB document](https://www.mongodb.com/docs/atlas/driver-connection/) for your reference.
3. To start the node server, you have script options that you can append to `npm run` here in [package.json](https://github.com/bprenaud/Simple-MERN-Application.2/blob/React/package.json)
   I suggest using `npm run dev` within a Bash shell which will run 'concurrently' to simultaneously run node server and REACT client.
4. You will see within the shell 'Server running on port 5000' which will indicate the node server is up and running. Second, you will see 'Mongodb connected' to indicate that the application successfully
   connected to your mongodb database.
5. Your browser will automatically open to localhost:3000.
6. Within the app, you will want to register/signup. In order to register, add a name, email and a 6 character password. You will be redirected to the Login page after a successful registration.
7. At the Login page, input your particulars and you will be directed to /dashboard page which is incomplete at this time. To leave the dashboard you must logout by pressing the 'Logout' button
   at the top-right corner of the browser window.
