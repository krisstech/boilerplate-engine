# Boilerplate Engine

Web app that generates app templates based on user selection. Written in React and .NET Core WebApi

## Currently supported options

### Client

Client side app templates. Generated using `npx` for latest cli versions. Just get the zip file, run `npm install` or `yarn` and start the app.

#### Angular

Angular client app

#### React

React client app. Supports toggle for typescript integration.

#### Vue

Vue client app

### Server



#### Dotnet

Dotnet core server. Currently supports `classlib`, `console` and `webapi` starters.

Choosing `webapi` will display toggles for `swagger ui` and `ef core` intergration

#### Node Express

Made using `npx` and `express-generator`

### Full-Stack

It is possible to generate client-server applications. Current options allow for any supported client side app with `dotnet webapi` server starter.

## Roadmap

- Add a lot of toggles and options for various cli offerings.
- Add option to include docker support (`Dockerfile`, `.dockerignore` and `docker-compose.yml`)
- Add multiple db options for servers
- Choice of testing frameworks etc.
- ...

### Dotnet roadmap

- Add `mongo` integration option
- Add `blazor` for client side
- Add ...

### Full-Stack roadmap

- Add `MVC` offerings (`rails`, `asp.net core mvc`, `express pug` etc)
- Set up `client-server` apps to interract with one another (eg. `react fetch` to `dotnet webapi values controller`)
- ...