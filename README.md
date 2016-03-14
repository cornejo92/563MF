
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Hi there! Welcome to Cloud9 IDE!

To get you started, create some files, play with the terminal,
or visit http://docs.c9.io for our documentation.
If you want, you can also go watch some training videos at
http://www.youtube.com/user/c9ide.

Happy coding!
The Cloud9 IDE team# 563MF

myFitness Presentation
What is the problem that exists?
Sometimes when starting a workout plan, or diet plan, it can become tedious writing down, and remembering what you need to eat, and when you need to eat. It can also be hard to keep track of macro nutrients, and even micro nutrients. Sometimes it gets hard to be consistent without seeing your progress or charts & graphs.
This app hopes to solve the problem of not having a food / exercise tracker, and being able to see your progress in a meaningful way, as well as being able to compare that progress to your friends.
2. A written list of use cases, which describe some of what a user can do with the app.
(User experience, or UX)
A user registers to use the app on their phone, entering their information including email and password, username, weight, age, sex.
The user will be able to log in and see their old entries, as well as see their progress with their weight, strength, and body fat percentage.
The user will be able to be informed of new ways to workout that show demonstrations like a video or GIF, as well as a paragraph of information regarding the exercise.
The user will also be able to favorite videos posted by other users, and will be able to have a list of their favorite things on their home page.
The user will have access to graphs to see their progress, and be able to compare them to their friends graphs as well.
3. App Requirements
 The app will need iOS or Android operating systems in order to run.
The app must be downloadable from Google Playstore, or Apple Store (iTunes).
The app must allow anyone to register.
 The app must allow any registered user to login.
The app will be able to save entries while disconnected from the internet, and be able to upload their entries to the server once connected to the internet.
4. UI Mockups

5. Components - The app shall consist of two components;
An APK/? file, (client) which the user downloads from the PlayStore or iTunes
The Mobile Backend as a Service (MbaaS/backend). This component runs on a
computer server in the Cloud, and maintains the data (user information, and test
results). It is available at all times.
The app client makes requests to the backend to register a new user, login an
existing user, obtain the previous entries, and store the entries done by the user. The backend runs continuously and is ready at any time to receive requests from the client.
6. Data Models – Tables of information stored by the backend and provided to the client.
 MFUsers
	“firstName": "string"
	“lastName": "string"
	"email": "string"
	“age”: “number”
	“sex”: “bool”
	“height”: “number”
	“weight”: “number”
	“password”: “string”
	“userID”: “string”
Meals
 	"name": "string"
 	"calories": “number”
	"protein": “number"
	"fat": “number”,
	“carbs” : “number”,
	"userID": “string”,
          	"dateAdded": “number”
Results
	"userID": "string"
	"competing": "number"
	"collaborating": "number"
	"compromising": "number"
	"avoiding": "number"
	"accommodating": "number"
	"createDate": "date"
