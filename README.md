# Teslo API

1. Clonar archivo `.env.template` y renombrarlo como `.env`
2. Configurar variables de entorno en archivo `.env`
3. Levantar base de datos con `docker compose up`
4. Levantar el servidor con `npm run start:dev`
5. Ejecutar seed con el endpoint `api/seed`.

**Si ocure error al ejecutar el seed debido a permisos de autenticación, deshabilita el decorador `@Auth()` que se ubica en el controlador del seed**
