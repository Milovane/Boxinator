# Boxinator

## Description

Boxinator is a service that provides shipping of mystery boxes.
This repository contains the frontend functionality of the system.
The backend part can be found in this [repository](https://github.com/SethOberg/boxinatorAPI).

## User roles

Boxinator has the following types of roles:

- Guests
- Registered users
- Admin users

Boxinator allows users to create an account, log in, create shipments and view their current shipments.
Guest users can enter an email when creating shipments and will get a confirmation email when their shipment has been created.
Registered users will be able to log in and view their shipments.

Admin users have access to extra pages for managing shipments and their status.
Admin users also have the ability to update and add new countries with a multiplier, which determines the price of the shipment process.

## Authentication and authorization

The project is built with react and uses keycloak as an identity provider. When logging in, a JSON web token is recieved from keycloak, which is sent to the backend for authentication and authorization of the logged in user.

When opening the web page, the users will be able to create an account via keycloak if they have not already created one.
After a successful account creation, the user will need to register via boxinator to create an account at boxinator as well.
After the second registration, the keycloak identity will be linked to a user account at boxinator with the help of the subject id recieved from keycloak.

## Technologies

- HTML
- CSS
- Tailwind CSS
- Material UI
- Javascript Fetch API
- Axios
- JWT
- Keycloak

## Contributors

- Ali Habesh
- Milovan Glisovic
- Seth Öberg
