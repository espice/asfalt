# Asfalt

eSpice's (DPS Noida) Submission for CW23

## Project Setup

Load the following ENVs into your environment -

```
DATABASE_URL=postgres://default:N21pisyEvaLl@ep-lively-violet-43031439.eu-central-1.postgres.vercel-storage.com:5432/verceldb
DOMAIN=localhost
JWT_KEY=kwjektjherktjherktjherktjherkjther
FRONTEND_URL=http://localhost:5000
```

Run the Following Commands one by one -

```sh
pnpm i
```
```
pnpm build
```

To Run in 
```
pnpm -C packages/backend start
```

Then in another Terminal Window -
```
pnnpm -C apps/web start
```

## Accessing the Web App

1) Open `http://localhost:5000` in a browser.
2) Press `Ctrl + Shift + I` to open the Inspect Window
3) In localstorage, set the value of `dc.at` to be `rinkiya ke papa`. A login screen should now appear. You may need to refresh on non Chromium browsers.
4) Login using the following Credentials -

```
Agent ID: JB007
Password: mypswd
```

You should now be able to access the entire web app.


