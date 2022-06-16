# Edge-perience T3 2020: ReadMe created 29/11/2020 12:34am by Luke Sciberras

Project overview: Creation of a Web/Mobile app to enable fast access to mental healthcare professionals in Australian context.

+==================================================================================================+
|                                                                                   Installation guide - root                                                                                             | 
+==================================================================================================+
Hi Edge-perience team. This document will allow you to be able to install all the required software & dependencies to run the 
Edge-perience project on git.


+===========================+
|          Pre-requisite installations          |   <-- (Homebrew, only for macOS)
+===========================+

macOS
--------
It is required for macOS to install Homebrew as a prerequisite for the installation of MongoDB.

The link to HomeBrew can be found here: https://brew.sh/

Alternatively, you can install Hombrew my using this in your macOS Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


+===========+
|      Node.Js      |
+===========+

macOS, Linux & Windows
-----------------------
For installation of Node.Js, follow the URL and choose the installation that suits your local machine:
https://nodejs.org/en/download/

After installation, from terminal, check nodeJS installation by typing: node -v
Check npm installation by typing: npm -v

+===========+
|     MongoDB    |
+===========+

MongoDB can be a little tricky to install depending on your machine. As the guide will be too long, 
I will put links down for the installation page on the MongoDB website for each different OS.

macOS
--------
Assuming that you have installed the latest version of Homebrew, follow the prompts in the following URL:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

Linux
--------
Follow the link to install MongoDB on Linux:
https://docs.mongodb.com/manual/administration/install-on-linux/

Windows
--------
Follow the link to install MongoDB on Windows:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/


++++++++++++++++++
|       IMPORTANT!        |     <-- (it really is!)
++++++++++++++++++

Please follow the instructions in the README.md files in both 'frontend' & 'backend' folders AFTER installing MongoDB & Node.Js. 
To run nodemon & concurrently requires both frontend and backend dependencies to be installed =)


+==============+
|         Results!          |
+==============+

(Assuming that the backend & frontend dependencies have been installed)

\(-.-)/ Huzzah! All of the software needed for this project is installed! 

To run the project, navigate to the root file (Edge-perience git clone) and type: npm run dev

This will launch the front and backend simultaneously.

Changelog:

17/12/2020: 12:08am: Mark Sturtz updated the config instructions to include how to install MongoDB
04/12/2020 08:41pm: Kate Mitchell created file structure according to 'File Structure FE and BE.docx' in T3 Documentation folder.
16/12/2020 03:15pm: Kate Mitchell edited readme.md file to explain how to install the dependencies for the front and backend projects.
