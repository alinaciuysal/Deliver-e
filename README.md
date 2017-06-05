# Deliver-e
Team 28 - Project of "SEBA - Web Application Engineering Course" at TUM

## Backend

### Prerequisites

Check

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

Just for the backend application:

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)

### Setup

Go to the project backen folder via command line
```
cd path/to/workspace/Deliver-e/backend
```

**Install node dependencies**

```
npm install
```

**Set up your database**

* Create a new directory where your database will be stored 
```
mkdir path/to/database
```
* Start the database server 
```
mongod --dbpath path/to/database
```


**Set up environment configuration**

Create a copy of config file config/config.dev_local.js as config/config.js to work locally

```
cp config/config.dev_local.js config/config.js
```

### Running

Start the web server with following command

```
node server.js
```
