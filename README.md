# LoanCheap
![Alt text](/Document/small.gif)

This repo is part of a Software engineering course in Ariel University.

#### LoanCheap is a mobile app, for loans.

- Log in and find the best loan opportunities from the best banks
- Send a request and the bank will call you

## Features (for users)
- Search for loans and filter results
- Send a request for a loan
- View pending and accepted loans

## Features (for admin)
- Add new loans and remove old loans
- See loan requests made by users
- Accept and reject requests for loans made by you
- Contact users who sybmitted for your loans via phone or email
- See statistics

![Alt text](/Document/tech.png)

## Development
LoanCheap is built with:

- [ReactNative] - Open source UI software framework for creating native mobile apps
- [Nodejs] - Open-source, cross-platform JavaScript runtime environment
- [Mongodb] - A document database with the scalability and flexibility that you want with the querying and indexing that you need

## Installation

To run this project on your pc you need to have NodeJs, Reactnative,  MongoDB, AndroidStudio, and JDK 11 installed.
After installing these technologies, please do the following:

Clone the repository:
```sh
https://github.com/Eli-Levi/LoanCheap.git
cd LoanCheap
```

Install the dependencies in the backend
```sh
cd LoanCheap/server
npm install
cd ../
```
Run the backend.
```sh
cd LoanCheap/server
node index.js
```

Install the dependencies in the frontend
```sh
cd LoanCheap/LoanCheap
npm install
cd ../
```
Run the frontend, open two terminals.
```sh
cd LoanCheap/LoanCheap
npm start
```
```sh
cd LoanCheap/LoanCheap
npm run android
```

## Issues
Should the app raise errors while trying to start the frontend, try running the following command first.
```sh
npm install
```
Since you might be missing some packages.

## Authors
   Eli Levi, Dor Baram, Ibrahim Chahine
   
   
   [ReactNative]: <https://reactnative.dev/>
   [Nodejs]: <https://nodejs.org/en/>
   [Mongodb]: <https://www.mongodb.com/>
