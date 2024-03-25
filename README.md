# <p align="center">Travel Tracker 🌍</p>

<p align="center">This site allows a traveler to login to their account to view past and pending trips, summary of spending over the year, and plan a new trip! The site was developed using TDD and designed for ease of use with or without a pointing device.</p>

## Preview:
<div align="center">
  <img src="https://github.com/tednaphil/TravelTracker/blob/main/.github/TravelTrackerDemo.gif?raw=true" alt="app demo">

</div>
<p align="center">Technologies Used</p>
<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge" alt="javascript badge">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=for-the-badge" alt="html badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=for-the-badge" alt="css badge">
  <img src="https://img.shields.io/badge/Mocha-8D6748?logo=mocha&logoColor=fff&style=for-the-badge" alt="mocha badge">
  <img src="https://img.shields.io/badge/Chai-A30701?logo=chai&logoColor=fff&style=for-the-badge" alt="chai badge">
  <img src="https://img.shields.io/badge/Lighthouse-F44B21?logo=lighthouse&logoColor=fff&style=for-the-badge" alt="lighthouse badge">
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?logo=webpack&logoColor=000&style=for-the-badge" alt="webpack badge">
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=for-the-badge" alt="vscode badge">
  <img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=for-the-badge" alt="figma badge">
  <!-- other badges -->
</div>

## Setup Instructions:
<!-- - add list of instructions -->
- clone the local server to your machine
    
    ```
    git clone git@github.com:turingschool-examples/travel-tracker-api.git
    ```
    
- run `cd travel-tracker-api`
- run `npm install`
- run `npm start` to run the local server
- navigate to this [link](https://tednaphil.github.io/TravelTracker/)
- login using the following credentials
    ```
    username: traveler<id> (id is a numeral between 1-50)
    password: travel
    ```

## Testing Instructions
- clone the repository to your machine
    ```
    git clone git@github.com:tednaphil/TravelTracker.git
    ```
- run `cd TravelTracker/test` and open code editor to view test files
- run `npm test` to run tests

## Context:
<!-- wins, challenges, time spent, goals, approaches etc -->
- ~ 4 hours to build static comp & 20 hours to create test suite and add functionality
- Solo project completed in the 11th week of studying front-end development with Javascript, CSS, and HTML

### Goals
> - Use object and array protoype methods to perform data manipulation
> - Create clear & accessible user interface
> - Make network requests to send and retrieve data
> - Implement a robust testing suite using TDD
> - Produce DRY, reusable code that follows SRP (Single Responsibility Principle)
  
### Wins
 > - 100 accessibility score and usability without pointing device
 > - Error prevention with input validation and visible user feedback using `<dialog>` elements for reactive error handling
  
### Challenges
> - dynamic date validation - solved with using Javascript to determine the current date and set the date input min attribute
> - Resolving bug producing `'Response': body stream already read` error when fetching new data to display on DOM - solved using an individual fetch request for the updated data only
> - creating test data that accurately represents the data model on a smaller scale

  
