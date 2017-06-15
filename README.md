# Emissary 2.0
[![Build Status](https://travis-ci.com/prkumar/Emissary.svg?token=nMZqBSpBhyZh9iNzRBhA&branch=master)](https://travis-ci.com/prkumar/Emissary) [![Code Climate](https://codeclimate.com/repos/59195600f81f3102a90003f9/badges/0f8f5e69a8e234418fde/gpa.svg)](https://codeclimate.com/repos/59195600f81f3102a90003f9/feed) [![Test Coverage](https://codeclimate.com/repos/59195600f81f3102a90003f9/badges/0f8f5e69a8e234418fde/coverage.svg)](https://codeclimate.com/repos/59195600f81f3102a90003f9/coverage)

## 0. Currently deployed on: 
http://dockin.herokuapp.com
## 1. Getting Started
**Emissary is a visitor check-in SaaS application targetted for small businesses.**
- Sign up your company and your own personal account for your company. 
- Thereafter, add employees to your company through the "Employees" section of the application to provide them access to the application. 
- Create appointments through the "Appointments" page. Open up the Check-in mode by clicking on the gear in the upper right-hand corner.
- As visitors check-in, they will show up in the queue on the "Visitors" page. 
- If there is an appointment that matches their information, their appointment time will automatically be populated.
- Click on a visitor to check him/her out. If he/she had an appointment, their appointment will automatically be removed from the "Appointments" section.

  

### 1.1 List of Requirements
1. **Node.js** (http://nodejs.org/)
2. **MongoDB** (https://www.mongodb.org/)
3. **jQuery** (https://jquery.com/)

### 1.2 Instructions
**Step 1:** Do a `git clone` on our project on **Github** (https://github.com/thiefjack/WebStormTroopers/).

**Step 2:** Run `npm install` in the directory of the project to install the dependency for the backend.

**Step 3:** Run `gulp test:server` to test the backend API.

**Step 4:** Run `gulp test:client` to test the frontend dependecies.

**Step 5:** Run `npm start` to start the application.
