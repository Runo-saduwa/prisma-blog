# Personal Blog API with Prisma, Express and TypeScript

## Set up locally

#### Install dependencies

`npm install`

#### Update `.env`

set `P0RT` value to any free port

#### Run the server

`npm run dev`

Server should run at your specified port number.

#### Build for prod

`npm run build`

## How the project was scaffolded from scratch

#### Generate package.json with default settings

`npm init -y`

#### Install TS and its deps

`npm install typescript ts-node @types/node @types/express --save-dev`

#### Install Prisma CLI

`npm install prisma --save-dev`

#### Intialize Prisma with any db. e.g with sqlite

`npx prisma init --datasource-provider sqlite`

#### Install Express and dotenv

`npm i express dotenv`

#### Initialize TS and generate `tsconfig.json`

`npx tsc --init`

#### Edit `tsconfig.json`

Uncomment `outDir` and set it to `"./dist"`. this is where TS will be compiled to

```
{
  "compilerOptions": {
    ...
    "outDir": "./dist"
    ...
  }
}
```

#### Update `main` in package.json to:

`"main": "dist/server.js"`

#### Update `server.js` with the following:

```
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
```

#### And run your server 
`npm run dev`
