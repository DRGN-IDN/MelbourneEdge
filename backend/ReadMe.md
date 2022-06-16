# Edge-perience T3 2020 Backend files: ReadMe created 04/12/2020 08:21pm by Kate Mitchell

Project overview: Creation of a Web/Mobile app to enable fast access to mental healthcare professionals in Australian context.

Configuration instructions: Requires installation of npm, express and nodeJS.

+==================================================================================================+
| Installation guide - backend |
+==================================================================================================+
Hi Edge-perience team. This document will allow you to be able to install all the required software & dependencies to run the
Edge-perience project on git.

After installing all of the important software such as Node.Js & MongoDB, we can actually start
installing dependencies for the git repository.

Please ensure that you have followed the installation guide in the root folder's REAMDE.md file
As it is a pre-requisite step to this backend guide.

+=================+
| Step guide! |
+=================+

Step 1: Open the project in your terminal/command prompt (edge-perience_2020t3)

Step 2: access the backend folder by entering the command: 'cd backend'

Step 3: install the relevant dependencies by using the command: npm install express cors body-parser mongoose mongodb nodemon

Step 4: install the additional dependancies: npm install bcrypt mongoose-field-encryption jsonwebtoken passport passport-jwt nodemailer uuid helmet

Step 5: Add the following line into the package.json file in the back end, directly after the scripts section
"proxy": "http://localhost:5000",

This will install a 'node_modules' folder. This folder differentiates dependant on OS. This means That it needs to be installed by the
user. After this is installed, DO NOT make changes inside the folder. Our repository has this folder included in the git ignore file and
will not be pushed with the other files in the repo.

+==============+
| Results! |
+==============+

\(-.-)/ Hooray! We have installed the back-end dependencies.

Changelog:
17/12/2020 11:45pm: Made installation guide for edge-perience team to follow instructions to install all dependecies - Mark Sturtz
04/12/2020 08:27pm: Repo file structure created according to 'File Structure FE BE.docx' in T3 Documentation file.
Installed nodemon, body-parser, cors, mongodb, mongoose.
Created server.js file to require express, body-parser and cors and to listen at Port:5000, as per instruction by Achmad Mustafa Kemal (T3 FE supervisor).
10/12/2020 03:11pm: Added a .gitignore file to the backend folder to avoid inclusion of unnecessary files.
13/12/2020 01:34pm: Updated readme.md to include instructions for installing dependencies.
30/01/2020 LUKE SCIBERRAS 213085878 12:39 AM || UPDATING README.MD TO REFLECT ADDITION OF HELMET DEPENDENCY.
