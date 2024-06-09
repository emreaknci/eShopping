
# eShopping

This project shows how to use microservices in e-commerce. Microservices split big systems into small pieces, making them flexible. Things like Event Driven help services talk to each other, cutting down on how much they rely on each other. This new way of doing things is important for online stores.

## Run Locally

Before running the application, you need to copy the project to your desired directory using the following command:

```bash
   git clone https://github.com/emreaknci/eShopping.git
```

The project is dockerized. You can launch the application by running the following command in the project's root directory.

```bash
   docker-compose -p eshopping up -d
```

If you wish, you can change the database usernames and passwords to your preferences in the docker-compose.override.yml file.

After all containers are running, you can access the web application at http://localhost:5173/.

You can sign in as an admin using the email "admin@admin.com" and the password "123456".

## Tech Stack

<p align="left"> 
<img height="75" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png">
<img height="75" src="https://user-images.githubusercontent.com/25181517/189716630-fe6c084c-6c66-43af-aa49-64c8aea4a5c2.png">
<img height="75" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png">
<img height="75" src="https://user-images.githubusercontent.com/25181517/121405754-b4f48f80-c95d-11eb-8893-fc325bde617f.png">
<img height="75" src="https://api.nuget.org/v3-flatcontainer/ocelot.provider.eureka/23.2.2/icon">
<img height="75" src="https://user-images.githubusercontent.com/25181517/187087692-1b80b31c-5cd6-4fd5-aa24-d07e38a6897f.png">
<img height="75" src="https://miro.medium.com/v2/resize:fit:612/1*CN6U7wY6Q9OusXLOnUdjag.png">
<img height="75" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/50342602-8025-4030-b492-550f2eaa4073">
<img height="75" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png">
<img height="75" src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png">
<img height="75" src="https://images.ctfassets.net/ee3ypdtck0rk/3tLmcHuiDfOr14Lntlm8lG/edead3af754857409d690681100690e3/icon-tech-signalR.png?w=256&h=256&q=50&fm=png">
<img height="75" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png">
<img height="75" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png">
</p>

# System Diagram

- **Identity Service**: This service is developed to manage users. It handles basic functions such as registration, authentication, and token generation.

- **Catalog Service**: This service manages and presents the project's products. It allows users to search, filter, and access detailed information about the products. Additionally, admin users can add, update, and delete products through this service.

- **Basket Service**: This service manages the shopping cart functionality of the project. It enables authenticated users to add products to the cart, update product quantities, and remove products from the cart.

- **Comment Service**: This service is responsible for product reviews. Users can post comments on products and view existing comments.

- **Notification Service**: This service handles notifications. Currently, it can send notifications via email and console output. It listens for events published by the PaymentService and sends notifications based on these events. Currently, only email notifications are supported.

- **Payment Service**: This service is responsible for payment processing. Since there is no integration with a real payment system, payments are accepted using standard-compliant card information. Based on the payment status, events are published through the EventBus to notify other services.

- **Order Service**: This service is responsible for order management. It stands out from other services by using methods such as the CQRS Pattern and Onion Architecture.

- **Ocelot API Gateway**: It acts as a single entry point for clients to access microservices, handling tasks like routing, security, and monitoring.

- **Consul**: Consul is a service mesh solution providing features like service discovery and health checking, enabling dynamic and resilient communication between microservices.



<p align="center">
  <img width="100%" src="https://lucid.app/publicSegments/view/2fa20423-5311-4040-ba7b-24da04bba51c/image.png">
</p>

# Event Driven Architecture


The main purpose of the project can be perceived as developing a microservices project, but actually, the primary goal is to facilitate communication between these microservices. For this, we need an event-driven architecture, which is named Event Bus. The workflow consists of the following steps:

**1. User Checkout Request:** The user enters the information to purchase items in their cart and sends a request to the Basket Service.

**2. Order Creation:** When the Basket Service receives the Checkout request, it sends a request to the Order Service to create an order.

**3. Payment and Stock Update:** While creating the order, the Order Service sends a payment request to the Payment Service and updates the stock from the Catalog Service.

**4. Processing Based on Payment Result:** If the payment is successful, a notification is sent to the user, and the cart is emptied. If it fails, the order is canceled, and the stocks are updated.


<p align="center">

<img width="100%" src="https://lucid.app/publicSegments/view/8e60e4ea-5fc2-417a-b5c0-e73adf6f3da4/image.png">
</p>
