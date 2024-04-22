
# Movies World 🎥

Search, find and discover interesting movies, tv series and people related to cinema. Thanks to a clear interface, move very smoothly into page. You can check a lot of details. Data is fetching from an external [API](https://www.themoviedb.org/) and prepared appropriately. 

## Configuration
For the application to work properly, you have to generate a Bearer token. Without it, app will not work! 
1. Go to this [page](https://www.themoviedb.org/) and create the user account.
2. Go to account settings and find "API" tab.
3. Find "Request an API Key" and generate key for "Developer".
4. In next step you must give them a couple of informations. 
5. Ready! Now your "API Read Access Token" is ready and it will be necessary (not API KEY!). 

## Project setup

1. Download this repository.
```bash
git clone https://github.com/KamilSajdera/Food-Order-App
```
2. Install dependencies
```bash
npm install
```
3. In root folder create new file called ".env" and paste it:
```bash
REACT_APP_BEARER_KEY=YOUR_KEY
```
Instead "YOUR_KEY" paste your "API Read Access Token".

4. Start app
```bash
npm start
```

You can also view website on https://saydi-movies-world.netlify.app