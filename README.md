# PC2_Docker_WebApp

# link Docker Hub

```
https://hub.docker.com/repository/docker/cesarcaro97/pc2_docker_webapp_2022
```

## Lo puede correr de dos formas:

# 1) Run Local

### Front End

```
npm start
```

### Server

```
node index.js
```


# 2) Run Docker

Primero clona este repositorio 

```
git clone https://github.com/cesarcaro97/PC2_Docker_WebApp
```

Ingrese a la carpeta donde se guardó el repositorio

```
cd PC2_Docker_WebApp
```

En la raiz correr el comando:

```
docker-compose build
```
Luego,

```
docker-compose up -d
```

# Puertos

## Phpmyadmin
```
localhost:8080
```
## Front
```
localhost:3000
```
## Server
```
localhost:8000
```






