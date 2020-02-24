# express-api-boilerplate - In Progress
Server setup with express framework basic features

**Description**
* Express framework based backend api application
* express-api-problem for error consistency across the application
* mongodb database
* rabbitMQ producer and consumer support - ~~Currently RabbitMQ connection method is commnented while setting up server in app.js~~
* rabbitMQ auto re-connectivity logic after RabbitMQ is down from application
* configurations are in .config.json and local configuration can be override in .config.override.json

#
**Install dependencies:**
* yarn install

#
**Build/Run application:**
* yarn start (for production environment) **/**
* yarn dev (for development environment)

#
**Application health status:**
* information about the application and its health status

**Get:**
```
http://localhost:3130/health
http://localhost:3130/keep-alive
http://localhost:3130/ping
http://localhost:3130/version
```
#
**Student Module:**

* **Post:**
```
http://localhost:3130/api/v1/student
```
**Body:**
######
```
{
	"firstName": "Danish",
	"lastName": "Siddiq",
	"registrationNumber": 1234567,
	"email": "danish.siddiq@email.com"
}
```

#
* **Get:**
```
http://localhost:3130/api/v1/student/:id
```

#
* **Put:**
```
http://localhost:3130/api/v1/student/:id?firstName=danish1&lastName=siddiq1
```

#
* **Delete:**
```
http://localhost:3130/api/v1/student/:id
```

#
**Improvements:**

It is still in progress, feel free to add further features into it

