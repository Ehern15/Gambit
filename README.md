# Gambit
Looking for group (LFG) platform, gambit is a place for gamers to find other gamers with games they share in common to pair up and queue into competitive matches!


## Running React (the front end)
From the terminal you will want to navigate to this path once cloned:

``cd gambit-react``

And then you will want to install npm packages, run this command: 

``npm install`` 

After running the below command, it will open the front-end's site on your default browser:

``npm start``

The login page should have opened within your default browser.

## Running the Server 
Download Eclipse, you can downloaded it from this link: https://www.eclipse.org/downloads/. 
Go through the installation as normal and leave everything within it's defualt settings. 
Once the installing is done, go to: 

``File -> Import -> Gradle -> Existing Gradle Project -> Next > -> Next > -> Browse``

Select the directory ``/gambit-server`` and then open it.

``Next > -> Next > -> Next > -> Finish``

If you do not see the directory explorer select:

``Window -> Show View -> Project Explorer``

Now from the Project Explorer Panel, go to:
``gambit server -> src/main/java -> com.gambit.server -> (double click) GambitServerApplication.java``

This should open the file within the text editor panel. Now click on the Run button (green play button). This will get the server running, when you done with running the server, end it by clicking the Terminate button (red square icon) and that will end it. 

## Running the Database
Download the MySQL installer from https://dev.mysql.com/downloads/installer/ (this is the windows installer).

When going through the installation steps, choose MySQL Workbench. Once the installation is finished, open MySQL Workbench. Select the '+' icon next to MySQL connection. Name the connection and click on 'OK'.

Execute this by clicking on the lighting bolt
``create database gambitdb

use gambitdb

select * from user``

Delete the snippet and execute ``select * from user`` when you need to update the database. 

From here everything should be setup to work and enjoy Gambit's prototype. 


