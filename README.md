# AmazonProductCatalog

This project is a simple product catalog server (Express + Mongoose) and a client static SPA.  
The server expects a MongoDB instance, and the sample CSV provided in the repository can be imported into MongoDB.

---

## Quick local setup (macOS) - you should have two terminals open 

Follow these steps in order. Copy/paste the commands into a terminal. 

1) **Create a local MongoDB data directory:**

```bash
mkdir -p ~/data/db
```

2) **In Terminal 1: Install & run MongoDB as a Homebrew service (recommended):**
   - prerequisite: Have Homebrew installed on your macOS device.

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

3) **In Terminal 1: Verify MongoDB is running by running the below command in a separate terminal:**

```bash
mongosh
```

4) **In Terminal 2: Clone the repo and change into it:**

```bash
git clone https://github.com/theonewhoPrints/AmazonProductCatalog.git
cd AmazonProductCatalog
```

5) **In Terminal 2: Import the CSV into MongoDB:**

```bash
mongoimport --type csv   --file marketing_sample_for_amazon_com-ecommerce__20200101_20200131__10k_data.csv   --headerline   --db demo   --collection productcatalog
```

6) **In Terminal 2: Install server dependencies:**

```bash
cd server
npm install
```

7) **In Terminal 2: Start the server (from `server/`):**

```bash
npm run dev
```

8) **Verify data & endpoints**

In Terminal 1: (the terminal where you opened `mongosh` earlier):

```bash
# In mongosh
use demo
db.productcatalog.findOne()
```

9) **Check the app:**

Go to: [http://localhost:4000](http://localhost:4000)

You should see the CRUD user interface.

10) **If port 4000 is in use,** change it to `4001` in the `.env` file under the `server/` directory.

**OPTIONAL:** Test the server endpoints:

```bash
curl http://localhost:4000/api/health
# Expected: {"ok":true}

curl http://localhost:4000/api/products
```

---

## Quick local setup (Windows)

Follow these steps carefully using **PowerShell** (recommended) or **Command Prompt**. You should have 2 shells or 2 command prompts open.
0) **Update Node.js:**

Make sure Node.js is on version v22.20.0+
If it isn't, update via https://nodejs.org/en/download

1) **Create a local MongoDB data directory:**

```powershell
mkdir C:\data\db
```

2) **Install MongoDB Community Server (recommended):**

- Go to [MongoDB Community Server Download Page](https://www.mongodb.com/try/download/community)
- Choose your version (6.0 or later), select **Windows** and **MSI installer**
- Run the installer and select **Complete** setup
- During setup, check **“Install MongoDB as a Service”**
- Finish installation

3) **In Shell 1: Verify MongoDB is running:**

Open a new PowerShell window and run:

```powershell
mongosh
```

If it connects successfully (you see a `test>` prompt), MongoDB is running.

4) **In Shell 2: Clone the repository:**

```powershell
git clone https://github.com/theonewhoPrints/AmazonProductCatalog.git
cd AmazonProductCatalog
```

5) **In Shell 2:Import the CSV into MongoDB:**

```powershell
mongoimport --type csv   --file marketing_sample_for_amazon_com-ecommerce__20200101_20200131__10k_data.csv   --headerline   --db demo   --collection productcatalog
```

> ⚠️ Make sure `mongoimport` is in your PATH (it’s included with MongoDB Database Tools).
> Download it here: https://www.mongodb.com/try/download/community
> You may have to manually add C:\Program Files\MongoDB\Tools\100\bin to your path variables.

6) **In Shell 2:Install server dependencies:**

```powershell
cd server
npm install
```

7) **In Shell 2: Start the server (from `server/`):**

```powershell
npm run dev
```

8) **Verify the data:**

In Shell 1(the shell where you opened `mongosh` earlier): `mongosh`:

```bash
use demo
db.productcatalog.findOne()
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
