# Note For Developers:
- Android App code available at [HERE](https://github.com/arinmodi/SecureFileTransfer)

<br>

#  Getting Started 👨‍💻
### Setup the repository to your local environment.

1. `Fork` the repository  - Creates a replica of repository to your local environment.
2. Clone the repository - Downloads all repo files to your machine, using
  ```git
  git clone https://github.com/YOUR-USERNAME/SecureShareBackend
  ``` 
3. Set working directory to the root directory of the project.
  ```sh
  cd SecureShareBackend
  ```
  
  <br>
  
 ### Setup the firebase project and configure the enviroment variables
 
 1. Go to [Firebase](https://firebase.google.com/) and click on, <b>Get Started</b>
 <br>
 
 2. Set up the new web project and enable the firetsore and storage, also update the rules for stoarge and firestore to
 ```
match /{allPaths=**} {
allow read, write: if true;
}
 ```
 <br>
 
 3. Now go to project settings -> Service Account, select Node js and  click on <b>Generate New Private Key</b> and download the file
 <br>
<img src="https://github.com/arinmodi/SecureShareBackend/assets/61725413/74d25cdf-1542-4735-ae2b-0cc806bbea63" width=80%>
 <br>
 <br>
 
 4. Open the file and copy following value from downloaded file and paste into the .env file
 - copy project_id and paste to the value of FIREBASE_PROJECT_ID
 - copy private_key and paste to the value of FIREBASE_PRIVATE_KEY
 - copy client_email and paste to the value of FIREBASE_CLIENT_EMAIL

5. Set the value of <b>IMAGE_FILE_PATH</b>, env variable to any absoulate file path of your system

<br>

### Start Building:

1. Run following command
```
npm install
```
<br>

2. Run the test
```
npm run test
```
- if test fails, you must did mistake in setting up the enviroment variables.

<br>
3. Once test passed, you are good to start making changes. Make sure to make changes in the branch other than master and make a pr.
