# Device Manager

Disclaimer: Please note that this app was implemented and tested with the Brave Browser (based on Chromium).



## --- Install Instructions ---

0. cd backend
1. npm install
2. cd ....\cd backend\server
3. npm install
4. cd ....\cd backend\client_
5. npm install

It may be necessary to also do
- "npm install mqtt" manually inside the server folder
- "npx playwright install" inside the backend folder (There will probably be an error message with the command and say that the browsers are not installed)

## --- Running ---


### Start server: 

1. cd ....\Device-management-app\server
2. npm run dev

### Start Client:

1. cd ....\Device-management-app\client_ 
2. npm run dev

Open http://localhost:5173/