# Uber Microservices

A simple microservices-based ride-hailing application built with Node.js, Express, MongoDB, RabbitMQ, and an HTTP gateway. The project is organized into separate services for users, captains, rides, and a gateway that routes requests to the correct service.

## Overview

This project demonstrates a modular backend architecture where each service handles a specific domain:

- User service: handles user-related routes and authentication flow
- Captain service: handles captain/driver-related routes
- Ride service: handles ride creation and ride acceptance logic
- Gateway: acts as the single entry point and proxies requests to the appropriate service

## Architecture

| Service         | Port | Purpose                                    |
| --------------- | ---: | ------------------------------------------ |
| Gateway         | 3000 | Main entry point for all incoming requests |
| User Service    | 3001 | User management and authentication         |
| Captain Service | 3002 | Captain/driver management                  |
| Ride Service    | 3003 | Ride operations                            |

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- RabbitMQ with amqplib
- JWT for authentication
- Cookie parser for cookie-based auth handling
- dotenv for environment configuration

## Project Structure

```text
uber-microservices/
├── gateway/
│   └── app.js
├── user/
│   ├── app.js
│   ├── server.js
│   ├── controller/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── service/
├── captain/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── ride/
│   ├── app.js
│   ├── server.js
│   ├── controller/
│   ├── middleware/
│   ├── routes/
│   └── services/
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- MongoDB running locally or remotely
- RabbitMQ running locally or remotely

## Installation

Install dependencies for each service separately:

```bash
cd gateway
npm install

cd ../user
npm install

cd ../captain
npm install

cd ../ride
npm install
```

## Environment Variables

Create a `.env` file in each service folder and define the required settings.

Example:

```.env
MONGO_URI=mongodb://localhost:27017/uber
RABBITMQ_URL=amqp://localhost
JWT_SECRET=your_secret_key
```

> The exact environment variables may vary depending on your implementation, but the services in this project use MongoDB and RabbitMQ connection settings.

## Running the Project

Start the services in separate terminals:

```gitbash
cd user
node server.js
```

```gitbash
cd captain
node server.js
```

```gitbash
cd ride
node server.js
```

```gitbash
cd gateway
node app.js
```

Once all services are running, the gateway will be available at:

```gitbash
http://localhost:3000
```

## API Flow

Requests are routed through the gateway:

- `/user/*` → user service
- `/captain/*` → captain service
- `/ride/*` → ride service

This setup makes it easy to scale and maintain each service independently.

## Notes

This is a learning-oriented microservices example and may require further refinement for production use, including:

- better error handling
- validation and input sanitization
- logging and monitoring
- deployment configuration
- testing and CI/CD


