## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Architechture](#architechture)

## General info
This app is a market place for selling and buying tickets

## Technologies
Project is created with:
* TypeScript (NodeJS runtime)
* Next.js (React) 
* Kubernetes
* Digital Ocean

## Architechture
The application is of Mcroservices architecture:
Services seperated as:
* Authorisation service.
* Ticket service.
* Order service.
* Payment service.
* Expiration service.

Communication between the services is through through the Nats Event Bus.








	

