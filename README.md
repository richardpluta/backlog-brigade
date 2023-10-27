## Notes:
- Front end is React, but I made it Typescript instead of Javascript, which can be more frustrating... but also helps debug errors since everything has to be strictly typed. This can be changed to javascript if we want to do that.
- Currently only set up a basic test endpoint in the API and then a basic test component which I put on the home screen just to make sure that the front end -> back end calls were successfully able to run.

## Needed to Run:
- a C#.NET IDE such as VS or JetBrains Rider
- an IDE for react, I personally use Visual Studio Code but I'm sure there's others out there.
- Node.Js installed for npm commands
- I'm sure there are other things? Not sure what I just happened to have installed on my computer from past projects vs. what is needed.

## Local Setup:
**1. Clone Repo**
  - save it locally somewhere (I would not suggest anywhere on the "OneDrive" as this can cause weird issues).
    
**2. Open solution in IDE of your choice (suggestion: visual studio or rider).**
    - You should be able to click run and it will download all needed packages while building.
  - It should open up a swagger page in you browser as well as a console.
  - You should be able to try out the testget endpoint in swagger, or by going to localhost:7035/api/Test/testget.
  - If it worked, it will display a JSON "test object" that was created.
  - leave this running
    
**3. Open up ClientApp folder in IDE of your choice, I used Visual Studio Code.**
  - Run "npm install" and it should install all required packages to run.
  - Make sure that the backend swagger page/solution is running still. 
  - In terminal run "npm start" command and you should see the UI run in your browser through localhost:6035.
  - You should also see the same TestObject data appear in the UI

## Troubleshooting (will add to as more issues come around):
| Part of App | Error | Fix |
| ----------- | ----------- | ----------- |
| UI | Compile Errors | Make sure npm install has been run | 
| UI | missing script "start" | make sure you cd into ClientApp folder | 
| UI | Error occured while proxying request localhost:6035....| Make sure backend API is running | 

