# nanny-scheduler-BE

This is an API that will register a new user, allow them to login, and make requests

The authorization endpoints are as follows:

## Register:
a new user will need to add:
-username
-password
-firstname
-lastname

they can optionally add:
-city, state
-if they are a nanny
-services they offer
-if they can drive children around
-rates
-availablility



## Login
they will need to enter in the username and password they created at login.
Authenticated with JSON web tokens.


## Request
to post a request they will need to add:
-name
-city, state
-number of kids and their ages
-time you will need a nanny for

this endpoint will take the requester's id and cross check against potential nanny's id in the database
It will return a boolean value if the request is accepted or not.

Full Documentation:
https://documenter.getpostman.com/view/9507100/SW7Xb9wn?version=latest