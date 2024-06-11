### Blooming

## Descripción del Proyecto
Blooming es una aplicación innovadora diseñada para monitorear el bienestar emocional de los alumnos en entornos escolares, específicamente en primaria y principios de secundaria. La plataforma ofrece un enfoque integral que combina un backend robusto con un frontend interactivo, permitiendo a educadores y administradores seguir el estado emocional de los estudiantes de manera efectiva y en tiempo real.

Para probarlo en directo puedes pinchar [aquí](https://blooming.ovh/inicio)

## Tecnologías Utilizadas
### Backend
- **Node.js** y **Express**: Utilizados para construir una API RESTful escalable y eficiente.
- **Sequelize**: ORM para la gestión de bases de datos SQL, proporcionando una interfaz fluida y simplificada para el acceso a datos.

### Frontend
- **Angular**: Framework de desarrollo frontend que permite crear una interfaz de usuario dinámica, modular y altamente interactiva.
- **HTML5, CSS3 y SCSS**: Utilizados para diseñar una interfaz atractiva y responsive.
- **WebGL**: Implementado para desarrollar un motor gráfico entero y personalizado pensado para la experiencia de los alumnos dentro de la aplicación.

### Características Clave
- **Gestión de KPIs**: Integración de indicadores clave de rendimiento para el seguimiento y análisis de métricas emocionales de los estudiantes.
- **Seguridad y Escalabilidad**: Implementación de prácticas de seguridad robustas y arquitectura escalable para soportar el crecimiento del proyecto.
- **Interfaz de Usuario Intuitiva**: Diseño centrado en el usuario para facilitar la navegación, la interacción y la visualización de los datos.

## Estructura del Proyecto
- **backend/**: Contiene el código del servidor, incluyendo controladores, modelos y rutas.
- **frontend/**: Código fuente de la aplicación Angular, con todos los componentes, servicios y estilos necesarios.

## Instalación y Configuración
### Prerrequisitos
- Node.js
- npm (Node Package Manager)
- Angular CLI
- Base de datos SQL (por ejemplo, MySQL o PostgreSQL)

### Pasos de Instalación
1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/franndeli/Blooming.git
   ```
2. **Instalar Dependencias del Backend**
   ```bash
   cd backend
   npm install
   ```
3. **Configurar la Base de Datos**
   - Crear una base de datos en tu gestor SQL preferido.
   - Configurar las credenciales de la base de datos en el archivo `config/config.json`.

4. **Iniciar el Servidor Backend**
   ```bash
   npm start
   ```
5. **Instalar Dependencias del Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
6. **Iniciar la Aplicación Frontend**
   ```bash
   ng serve
   ```

## Contribución
Agradecemos las contribuciones de la comunidad. Para contribuir, por favor sigue estos pasos:
1. Realiza un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`).
3. Realiza tus cambios y haz commit (`git commit -m 'Add some AmazingFeature'`).
4. Empuja tus cambios a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

## Licencia
Este proyecto está licenciado bajo la Licencia GPL-3.0. Para más detalles, consulta el archivo LICENSE.

Si te ha gustado el proyecto, quieres más información o te interesa contactar con el equipo desarrollador no dudes en ponerte en contacto a través del email delicadofranvi@gmail.com
¡Muchas gracias por visitar Blooming!
