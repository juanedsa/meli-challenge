# Meli Challenge

## Stack

- Angular CLI: 12.0.3
- Node: 14.16.0
- Package Manager: npm 6.14.11

## Puesta en Marcha

Instalar dependencias del front end

```sh
$ cd front
$ npm i
```

Volver a la raiz del proyecto e instalar dependencias del backend

```sh
$ cd ..
$ cd server
$ npm i
```

Poner en marcha el servidor

```sh
$ node src/server.js
```

Por defecto el servidor esta en el puerto `8080` Si lo desea cambiar debe ir a el archivo `server/src/config/config.js`.
Si cambia el puerto del server se debe cambiar en el frontend en el archivo  `front/src/environtments/environment.ts`

Poner en marcha el frontend

```sh
$ cd ..
$ cd front
$ ng serve
```

Correr pruebas unitarias

```sh
$ ng test --no-watch --code-coverage
```




El frontend quedara en la ruta por defecto `localhost:4200`


**Juan Salazar**
