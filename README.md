
![image](https://user-images.githubusercontent.com/62481232/113747810-71d53080-9710-11eb-8fc0-e421f1a7e1b1.png)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Architechture](#architechture)
* [Architechture Diagram](#architechture-diagram)
* [Deployment](#deployment)

## General info
This app is a market place for selling and buying tickets

## Technologies
Project is created with:
* TypeScript (NodeJS runtime)
* Next.js (React) 
* Kubernetes
* Digital Ocean

## Architechture
The application is of Microservices architecture. 
Services are seperated as:
* Authorisation service.
* Ticket service.
* Order service.
* Payment service.
* Expiration service.

Communication between the services is through the Nats Event Bus.

## Architechture Diagram

![uml](https://user-images.githubusercontent.com/62481232/114170224-48e4b380-993b-11eb-801b-d23e8b49976f.PNG)

## Deployment
Services are Dockerised and deployed with a Kubernetes cluser on DigitalOcean cloud.








	

