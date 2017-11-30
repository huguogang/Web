# Google API in Angular 2 TypeScript

## Bootstap Angular App
1. Install Angular CLI
  ```
  sudo npm install -g @angular/cli
  ```
2. Bootstrap Angular application
  ```
  ng new my-app
  ```
3. To serve it
  ```
  cd my-app
  ng serve --open
  ```

## Setup OAuth

1. Visit Google Cloud Console
1. Go to `API Manager`
1. Create "OAuth client ID"
  * Application Type: Web application
  * Name: Google API Demo
  * JS origins and rediect URIs: add http://localhost:4200
  * Client Secret. For example: "QSbbs6XR0leaAQnJnkabgbHm"
1. Configure "OAuth consent screen"

## Enabled Blogger API

1. Visit Google Cloud Console
1. Go to `API Manager`
1. Enable `Blogger API v3`

### More about APIs

  * Try Blogger API https://developers.google.com/apis-explorer/?hl=en_US#p/blogger/v3/

* API documentation: https://developers.google.com/blogger/docs/3.0/getting_started?hl=en_US


  readonly scope: https://developers.google.com/apis-explorer/?hl=en_US#p/blogger/v3/
  (complete list here: https://developers.google.com/identity/protocols/googlescopes)

## Start using gapi

* TS Type: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/gapi.auth2


## Install Types

```
npm install --save @types/gapi
```

* gapi
* gapi.auth2
