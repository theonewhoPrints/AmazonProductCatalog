# AmazonProductCatalog

This project is a simple product catalog server (Express + Mongoose) and a client static SPA.  
The server expects a MongoDB instance, and the sample CSV provided in the repository can be imported into MongoDB.

---

## Quick local setup (macOS) - should be done in MacOS Terminal
Follow these steps in order. Copy/paste the commands into a terminal. 

0) **Update Node.js:**

Make sure Node.js is on version v22.20.0+
If it isn't, update via https://nodejs.org/en/download or preferred method (can use homebrew)

1) **If you don't have homebrew installed**
   -run: 
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```


2) **Install & run MongoDB as a Homebrew service**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```
4) **Clone the repo and change into it:**

```bash
git clone https://github.com/theonewhoPrints/AmazonProductCatalog.git
cd AmazonProductCatalog
```

5) **Import the CSV into MongoDB:**

```bash
mongoimport --type csv   --file marketing_sample_for_amazon_com-ecommerce__20200101_20200131__10k_data.csv   --headerline   --db demo   --collection productcatalog
```

6) **Install server dependencies:**

```bash
cd server
npm install
```

7) **Start the server (from `server/`):**

```bash
npm run dev
```

8) **Check the app:**

Go to: [http://localhost:4000](http://localhost:4000)

You should see the CRUD user interface.

9) **If port 4000 is in use,** change it to `4001` in the `.env` file under the `server/` directory.

**OPTIONAL:** Test the server endpoints:

```bash
curl http://localhost:4000/api/health
# Expected: {"ok":true}

curl http://localhost:4000/api/products
```

---

## Quick local setup (Windows)

Follow these steps carefully using **PowerShell** (MUST)
1) **Update Node.js:**

Make sure Node.js is on version v22.20.0+
If it isn't, update via https://nodejs.org/en/download

2) **Install MongoDB Community Server, MongoDB Shell, and MongoDB Database Tools :**

- follow the youtube video below 
- https://www.youtube.com/watch?v=jvaBaxlTqU8 HOWEVER, don't install MongoDb Compass it's not needed, you can skip the videos portion on it. Stop at timestamp 4:41.
- the same steps you did for MongoDB Shell in the video, do ALL for MongoDB database tools (download here): https://www.mongodb.com/try/download/database-tools
- (make sure you added mongodb database tools to your env path variables, and also to the same folder in program files, just as was done for MongoDB Shell)

3) **PreReq permissions needed to use npm in powershell** 
- first, go to windows start button, and run powershell as adminstrator, once inside run the command:
  ```powershell
  Set-ExecutionPolicy RemoteSigned
  ```
- exit powershell, and now re-open it for next step(don't have to re-open as administrator).

4) **Clone the repository:**

```powershell
git clone https://github.com/theonewhoPrints/AmazonProductCatalog.git
cd AmazonProductCatalog
```

5) **Import the CSV into MongoDB:**

```powershell
mongoimport --type csv   --file marketing_sample_for_amazon_com-ecommerce__20200101_20200131__10k_data.csv   --headerline   --db demo   --collection productcatalog
```

> ⚠️ Make sure `mongoimport` is in your PATH (should be from step 2).

6) **Install server dependencies:**
```powershell
cd server
npm install
```

7) **Start the server (from `server/`):**

```powershell
npm run dev
```
9) **Check the app:**

Open your browser and go to:  
👉 [http://localhost:4000](http://localhost:4000)

If port 4000 is in use, change it in the `.env` file under the `server/` directory (for example, set it to `4001`).

10) **(Optional) Test the endpoints:**

```powershell
curl http://localhost:4000/api/health
# Expected: {"ok":true}

curl http://localhost:4000/api/products
```
