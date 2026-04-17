# Project Title

### Node.js Microservices Task Management System

# Overview

This project demonstrates a microservices-based backend architecture using Node.js.

The system is designed to simulate production-level patterns such as:

 - API Gateway routing
 - JWT authentication
 - Service-to-service communication
 - Redis caching
 - Rate limiting
 - Scalable stateless service


# Architecture

## Services:

 - Auth Service → handles login and token generation
 - User Service → manages user data
 - Task Service → handles task operations
 - Notification Service → handles event-based notifications
 - API Gateway → routes requests


# Tech Stack

 - Node.js
 - Express.js
 - MonmgoDB
 - Redis
 - JWT authentication
 - Docker


# Features

 - User authentication using JWT
 - CRUD operations for tasks
 - Pagination support
 - Redis caching for performance
 - Rate limiting middleware
 - Microservices architecture
 - Environment-based configuration

# How to Run

## Install dependencies:

`npm install`

## Start services:

`npm run start`
