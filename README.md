# Wayfarer: Be the Director of your own Life!

## Table of Contents

  - [Introduction](#Introduction)
  - [Set Up and Installation](#Set-Up)
  - [Illustrations](#Illustrations)
  - [Technologies](#Technologies)
  - [Possible Future Extensions](#Possible-Future-Extensions)
  - [Contributors](#Collaborators)
  - [Wins and Challenges](#Wins)

## Introduction

Wayfarer is a film-reel-themed travel app that will one day allow the user to seamlessly explore the world with a travel agent as their guide, book life-changing trips, and save priceless memories all in one application.

In this current iteration of the project, any one of the fifty users can login and view a dashboard containing their future-planned trips, their current pending trips, and their past trips.

Additionally, there is a form bar at the top of the page which allows for the user to customize a trip and submit it to their agent for approval.  After submission, the data is stored on a local server and the pending trips page is updated, accordingly.

Here is an example of the login credentials:

Username: traveler50 <-- Where the number at the end is the id of desired user.
Password travel

## Setup and Installation

- Fork the project repository and clone it down by posting the following command in your terminal: `git clone git@github.com:roryemagee1/wayfarer.git [what you want to name the repo]`
- Change into the directory created and then run `npm install` in your terminal to install all of the dependencies.
- Then change to the directory one level out from the one your in and fork the api server and clone it down by posting the following command in your terminal:
`git clone git@github.com:turingschool-examples/travel-tracker-api.git [what you want to name the api]`
- Make sure that both files you've cloned down are in the same directory and are not contained within one another.
- Change into the directory created and then run `npm install` in your terminal to install all of the dependencies.
- Then run `npm start` in your terminal to turn on the api server.
- Then change back into the project directory and run `npm start`.
- Finally, copy and paste http://localhost:8080 into a web browser to launch the project.

## Illustrations

## Technologies

- JavaScript
- CSS3
- HTML5
- Webpack
- node.js

## Future Extensions

As a travel agent:

I should be able to login:
I will see a login page when I first visit the site:
I can log in with the following credentials:

As a travel agent, upon logging in:

I should see a dashboard page that shows me:
New trip requests (a user’s “pending” trips)
Total income generated this year (should be 10% of user trip cost)
Travelers on trips for today’s date (number, names, however you want to display this!)
As a travel agent:

I should be able to see and approve / deny trip requests
I should be able to search for any user by name and:
View their name, a list of all of their trips, and the total amount they’ve spent (including 10% agent cut)
Approve a trip request for that user
Delete an upcoming trip for that user

## Contributors

Rory Magee | https://github.com/roryemagee1
