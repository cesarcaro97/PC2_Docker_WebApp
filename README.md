# PC2_Docker_WebApp

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

Primer paso, clonar el repositorio:

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
docker-compose up -d (puede generar errores el puerto 8000 por motivos de timeout de la herramienta, en ese caso usar el siguiente comando: docker-compose up -d server)
```

# Puertos

## Phpmyadmin
```
localhost:8080
```
## Server
```
localhost:8000
```
```
En el puerto 8000 que se activa en el play with docker, se genera una URL como esta: http://ip172-18-0-54-cagmk5o9jotg00b47pm0-8000.direct.labs.play-with-docker.com/
Para probar, usar el siguiente comando de ejemplo: curl http://ip172-18-0-54-cagmk5o9jotg00b47pm0-8000.direct.labs.play-with-docker.com/user/1001
Para el método de delete, usar curl -X "DELETE".
```

## Link Video DEMO
https://youtu.be/gAN9ohzlNVc







