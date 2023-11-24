### Introducción 

Esta aplicación backend proporciona una API REST de Recetas Regionales

### Funcionalidades

1. CRUD de Usuarios
2. CRUD de Recetas
3. Autenticación de Usuarios.

### A tener en cuenta

- Puerto utilizado para la base de datos 3307.
- Puerto en el que se ejecuta el servidor 3001.
- En la raiz del proyecto se encuentra un archivo SQL con recetas cargadas.

### Instalación

- Clonar el repositorio.
- Ejecutar npm install en la terminal.
- Ejecutar docker-compose, para generar el contenedor de mysql que contendra la base de datos.
- Ejecutar npm run dev para ejecutar el proyecto.
- Crear usuario con el end point signup ingresando username y password
- Ejecutar Archivo Recetas_SQL.sql de la raiz del proyecto, para insertar 6 recetas.

### API Endpoints
Lista de rutas disponibles:

Auth routes:

- POST api/signup - Signup
- POST api/signin - Signin
- POST api/token - Refresh Token

User Routes: 

- GET api/users - Get all users
- GET api/users/:userId - Get user
- PUT api/users/:userId - Update user
- DELETE api/users/:userId - Delete user

Recipe Routes:

- GET api/recipes - Get all recipes
- GET api/recipes/:recipeId - Get recipe
- POST api/recipes - Create recipe
- PUT api/recipes/:recipeId - Update recipe
- DELETE api/recipes/:recipeId - Delete recipe