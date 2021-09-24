# Mutant MicroService

Mutant Microservice requiere [Node.js](https://nodejs.org/) v10+ to run.

## Instalación

Para iniciar por favor clonar el proyecto, instalar las dependencias e iniciar el servidor

```sh
git clone https://github.com/ascuntar/mutants-ms.git
cd mutants-ms
npm install
npm run start
```

## Instrucciones para pruebas en local

El servicio corre por defecto en el puerto 3005. Este parametro pruede ser actualizado en el archivo .config.env así como las propiedades de la cadena de conexión a la base de datos.
Se adjunta una colección tipo Postman con los 2 servicios solicitados en el documento, esta colección está ubicada en la carpeta resources

```sh
cd mutants-ms/resources
```

#### MUTANTS API.postman_collection.json

Por favor abrir la colección con postman y ejecutar las dos apis existentes

```sh
POST http://localhost:3005/api/v1/mutant
GET  http://localhost:3005/api/v1/mutant/stats
```

La colección adicionalmente tiene las dos apis apuntando de manera remota al servicio en ejecución en Heroku para la prueba en remoto.

### Nota:

El servicio está alojado en una capa gratuita, por este motivo la primera solicitúd va a tomar un tiempo adicional mientras se prende el contenedor y arranca la aplicación

```sh
POST https://mutants-api-rest.herokuapp.com/api/v1/mutant
GET  https://mutants-api-rest.herokuapp.com/api/v1/mutant/stats
```

Con esto se puede verificar el funcionamiento del microservicio tanto en local como en remoto.
El servicio utiliza una conexión a una base de datos MongoDB la cual está alojada en Atlas, por lo tanto no es necesario tenerlo instalado para su ejecución.

## Documentación de Alto Nível Sobre el Desarollo

#### Stack de Tecnologias

- Node.js
- Express.js
- MongoDB
- Mongoose

Se utilizó la arquitectura orientada a servicios, en este caso particular se utilizaron 3 capas las cuales consiten en:

- Router: Es quien las peticiones externas
- Controller: Define que servicio ejecuta las peticiones realizadas
- Service: En esta capa se ejecuta toda la lógica de negocio

Es importante mencionar que se han utilizado librerías de uso habitual con el fin de acelerar el proceso de desarrollo y poder centrarse en la parte crucial que involucra el requerimiento especifico.

La idea principal del desarrollo es tratar como una matriz las cadenas de ADN suministradas, adicional a esto se cambió el orden de las cadenas con el fin de tener una matriz reversa. También se hizo un recorrido para obtener las cadenas en forma vertical (Columnas). Esto nos permite almacenar los datos en un Array y luego hacer la comparación con el metodo contains con el fin de determinar si en las posiciones se encuentra las cadenas solicitadas

- AAAA
- TTTT
- CCCC
- GGGG

### Validaciones

- Se realiza validación que la matriz sea mayor o igual a 4 posiciones para poder cumplir con el requerimiento de las cadenas solicitadas.
- Se realiza la validación que la matriz siempre sea cuadrada (mismo número de filas x mismo número de columnas)
- Se realiza la validación que la matriz solo contega los caracteres permitidos ATCG
- Se realiza la validación que la cadena de ADN a analizar y almacenar en la base de datos sea única
- Se realiza la validación que para determinar que la cadena de ADN pertenece a un mutante por lo menos debe haber 2 coincidencias de las cadenas solicitadas

#### Desarrollado por Eyder Ascuntar Rosales

para MercadoLibre
Septiembre 23 de 2021
