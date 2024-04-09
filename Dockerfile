# Definir una imagen base de Node.js
FROM node:18.16.1

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar la aplicación NestJS
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Definir el comando de ejecución para iniciar la aplicación
CMD ["npm", "run", "start:dev"]