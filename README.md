## cine-udea-movil

Ionic 1 (AngularJS + Cordova) mobile client for the **CineUdea** cinema listing and reservation project — a university coursework app for a Software Architecture class.

### What it does

Provides the mobile front-end for browsing a movie listing ("cartelera"), viewing movie/cinema details, logging in / registering, and reserving seats. It talks to a remote Node/Express + MongoDB API (see the companion `cineUdea` repository) through Angular services (`controladores/auth/auth.service.js`, `usuario.service.js`, etc.).

### Tech stack

- Ionic 1 / AngularJS
- Cordova (for building to Android/iOS)
- Gulp + Sass build pipeline
- Bower for front-end dependencies

### Project structure

- `www/controladores/` – AngularJS controllers (login, registro, cartelera, película, reserva, nav)
- `www/controladores/auth/` – authentication service and HTTP interceptor-style helpers
- `www/controladores/modal/` – login/registration modal controllers
- `www/templates/` – view templates
- `config.xml` – Cordova app configuration

### Running it

```bash
npm install
bower install
ionic serve
```

(Requires the [Ionic CLI](https://ionicframework.com/) and Cordova installed globally.)

### Context

University coursework project (Software Architecture class). This is the mobile counterpart to the `cineUdea` backend/web project in the same account.
