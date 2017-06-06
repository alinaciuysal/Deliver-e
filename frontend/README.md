# Deliver-e frontend application
Grocery delivery application based on AngularJS. Backend can be found [here](https://github.com/alinaciuysal/Deliver-e/tree/master/backend)

## Prerequisites

Both for the front end and the back end check:

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

## Install Dependencies

We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.com).

```
npm install
```

### Create a Bundle for the Application

This project use [webpack](https://github.com/webpack/webpack) version 1 for creating a bundle of the application and its dependencies

To install webpack, use

```
npm install --save-dev webpack
```

and then run

```
npm run build
```

Behind the scenes this will call `webpack --config webpack.config.js `.  After, you should find that you have one new folder in your project.

* `dist` - contains all the files of the application and their dependencies.

### Run the Application

We have pre-configured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.
