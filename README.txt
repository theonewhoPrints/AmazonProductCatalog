AmazonProductCatalog
Demo: https://drive.google.com/file/d/1osFddRu3bSasuftJB10fneXz52GD_cto/view?usp=sharing
This project is a simple product catalog server (Express + Mongoose) and
a client static SPA.
The server expects a MongoDB instance, and the sample CSV provided in
the repository can be imported into MongoDB.

------------------------------------------------------------------------

Quick local setup (macOS) - should be done in MacOS Terminal

Follow these steps in order. Copy/paste the commands into a terminal.

0)  Update Node.js:

Make sure Node.js is on version v22.20.0+ If it isn’t, update via
https://nodejs.org/en/download or preferred method (can use homebrew)

1)  If you don’t have homebrew installed -run:

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

2)  Install & run MongoDB as a Homebrew service:

    brew tap mongodb/brew
    brew install mongodb-community
    brew services start mongodb/brew/mongodb-community


3)  Import the CSV into MongoDB with this command in main directory of app:

    mongoimport --type csv   --file marketing_sample_for_amazon_com-ecommerce__20200101_20200131__10k_data.csv   --headerline   --db demo   --collection productcatalog

4)  Install server dependencies:

    cd server
    npm install

5)  Start the server (from server/):

    npm run dev

6)  Check the app:

Go to: http://localhost:4000

You should see the CRUD user interface.

7)  If port 4000 is in use, change it to 4001 in the .env file under the
    server/ directory.

OPTIONAL: Test the server endpoints:

    curl http://localhost:4000/api/health
    # Expected: {"ok":true}

    curl http://localhost:4000/api/products

------------------------------------------------------------------------

Quick local setup (Windows)

Follow these steps carefully using PowerShell (MUST) 1) Update Node.js:

Make sure Node.js is on version v22.20.0+ If it isn’t, update via
https://nodejs.org/en/download

2)  Install MongoDB Community Server, MongoDB Shell, and MongoDB
    Database Tools :

-   follow the youtube video below
-   https://www.youtube.com/watch?v=jvaBaxlTqU8 HOWEVER, don’t install
    MongoDb Compass it’s not needed, you can skip the videos portion on
    it. Stop at timestamp 4:41.
-   the same steps you did for MongoDB Shell in the video, do ALL for
    MongoDB database tools (download here):
    https://www.mongodb.com/try/download/database-tools
-   (make sure you added mongodb database tools to your env path
    variables, and also to the MongoDB folder in program files, just as
    was done for MongoDB Shell)
-   (make sure the env path you add is from the bin folder of mongodb
    database tools, it should look something like this:
    C:Files-database-tools-windows-x86_64-100.13.0)

3)  PreReq permissions needed to use npm in powershell

-   first, go to windows start button, and run powershell as
    adminstrator, once inside run the command:

        Set-ExecutionPolicy RemoteSigned

-   exit powershell, and now re-open it for next step(don’t have to
    re-open as administrator).

4)  Import the CSV into MongoDB with this command in main directory of app:

    mongoimport --type csv   --file marketing_sample_for_amazon_com-ecommerce__20200101_20200131__10k_data.csv   --headerline   --db demo   --collection productcatalog

  ⚠️ Make sure mongoimport is in your PATH (should be from step 2).

5)  Install server dependencies:

    cd server
    npm install

6)  Start the server (from server/):

    npm run dev

7)  Check the app:

Open your browser and go to:
👉 http://localhost:4000

If port 4000 is in use, change it in the .env file under the server/
directory (for example, set it to 4001). - might take a few seconds to
load on windows, so be patient.

8) (Optional) Test the endpoints:

    curl http://localhost:4000/api/health
    # Expected: {"ok":true}

    curl http://localhost:4000/api/products
