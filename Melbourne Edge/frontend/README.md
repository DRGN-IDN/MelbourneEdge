# Edge-perience T3 2020 Frontend files: ReadMe created 05/12/2020 08:21pm by Achmad Mustafa Kemal

Project overview: Creation of a Web/Mobile app to enable fast access to mental healthcare professionals in Australian context.

Configuration Instruction
Requires installation of npm, express and nodeJS.

+==================================================================================================+
| Installation guide - frontend |
+==================================================================================================+
Hi Edge-perience team. This document will allow you to be able to install all the required software
& dependencies to run the Edge-perience project on git.

After installing all of the important software such as Node.Js & MongoDB, we can actually start
installing dependencies for the git repository.

Please ensure that you have followed the installation guide in the root folder's REAMDE.md file
As it is a pre-requisite step to this frontend guide.

+==============+
| Step guide |
+==============+

Step 1: Open the project in your terminal/command prompt (edge-perience_2020t3)

Step 2: access the frontend folder by entering the command: 'cd frontend'

Step 3: To install dependencies, navigate to the frontend folder and type: npm i @testing-library/jest-dom @testing-library/react
@testing-library/user-event react react-dom react-scripts web-vitals

Step 4: Continue to install additional dependancies: npm i react-router-dom react-bootstrap styled-components axios react-modal redux redux-thunk react-redux jwt-decode is-empty

Step 5: Add the following line into the package.json file in the front end, directly after the scripts section
"proxy": "http://localhost:5000",

This will install a 'node_modules' folder. This folder differentiates dependant on OS. This means
That it needs to be installed by the user. After this is installed, DO NOT make changes inside the
folder. Our repository has this folder included in the git ignore file and will not be pushed with
The other files in the repo.

+==============+
| Results! |
+==============+


Changelog:
17/12/2020: Mark Sturtz - added easy install guide to README.md file for installing dependencies to the frontend folder.
05/12/2020 09:12pm: Achmad Mustafa Kemal created file structure for Front-End Development
13/12/2020 01:31pm: Kate Mitchell updated readme.md to include instructions for install dependencies.
1/1/2020 10:00am: BEVAN FAIRLEIGH Added dependancies for the updated frontend packages (react-router-dom react-bootstrap styled-components axios).
06/01/2021 11:00pm: Yang Xu added homepage
25/12/2020 5:30PM: Achmad Mustafa Kemal creating a registration form
29/12/2020 7:30PM: Achmad Musatafa Kemal adding javascript validation
27/12/2020 9:30PM: Luke Sciberras extracting data from form and converting to JSON object using axios. (Registration form)
25/12/2020 5:30PM: Achmad Mustafa Kemal creating a sign in form (skeleton) and install dependencies (react-bootstrap and styled component)
4/01/2021 9:30PM: Luke Sciberras extracting data from form and converting to JSON object using axios. (Sign in form)
07/01/2021 10:30AM Geraldine Jennifer Dessa Add hyperlink for forgot password form
07/01/2021 10:32AM Geraldine Jennifer Dessa forgot password form creation
27/12/2020 Phuong Dang Creating dashboard (skeleton)
07/01/2021 Shyam Kumar Kodali Styling dashboard
07/01/2021 11:00PM Styling for forgot password form
08/01/2021 16:00: Yang Xu Added Validation for sign in form
