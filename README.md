# Despliegue de Mongo BD + node.js CRUD

Laboratorio para el aprovisionamiento de un servicio persistente de Mongo DB y su conexión con una app crud en node js

## Requerimentos para la ejecucion de la guia

*	Tener una cuenta de IBM Cloud.
*	Contar con un cluster de Openshift 3.11.

## Indice

* Crear un nuevo proyecto en el cluster de Openshift
* Aprovisione el servicio Mongo DB en un contenedor de Opeshift
* Configure las variables de entorno para la conexión del CRUD con el servicio de Mongo DB
* Despliegue de la aplicación CRUD node js


### 1. Crear un nuevo proyecto en el cluster de Openshift

**a.**	Una vez abierta la consola web de Openshift presione "Create Project" y llene los campos con el nombre y la descripción del proyecto.

<p align="center">
<img width="278" alt="Annotation 2020-03-18 181640" src="https://user-images.githubusercontent.com/40369712/77016805-c57aad80-6946-11ea-83b3-c043412dcba1.png">
</p>

### 2. Aprovisione el servicio Mongo DB en un contenedor de Opeshift

**a.**  Seleccione el proyecto que acabe de crear, presione "Browse Catalog" y seleccione el servicio de MongoDB.

<p align="center">
<img width="790" alt="img2" src="https://user-images.githubusercontent.com/40369712/77017187-c3651e80-6947-11ea-9e32-e45080035016.png">
</p>

Una vez detro del catalogo podra ver todas las opciones disponibles para el despliegue de aplicaciones y servicios, dentro de estas encontrara MongoDB y MongoDB(Ephemeral) que corresponden a los servicios de datos persistentes y efímeros, seleccione el servicio MongoDB.

**b.**	Presione "Next" y proporcione las credenciales de acceso para su servicio de MongoDB.

Para fines practicos, el cluster ya cuenta con un servicio de MongoDB al que podra conectarse si no desea crear uno nuevo, las credenciales de conexión, de este se pueden ver a continuación.

<p align="center">
<img width="502" alt="img3" src="https://user-images.githubusercontent.com/40369712/77017999-0e803100-694a-11ea-958a-fb7ddc8a9ce0.png">
</p>
 
---

**Nota:** Debe tener en cuenta que el servicio de MongoDB no queda expuesto publicamente, por lo que solo podra realizarse la conexión con este, una vez la aplicacion se encuentre desplegada en el cluster de Openshift

---
Una vez igresadas las credenciales, presiones "Next" y luego "Crear", espere unos minutos mientas se aprovisiona su servicio de base de datos MongoDB

### 3.	Configure las variables de entorno para la conexión del CRUD con el servicio de MongoDB 🛠️
---

**Nota:** La aplicacion CRUD que se encuentra en este repositorio esta configurada con las credenciales proporcionadas para la conección con el servicio que se creo anteriormente, si desea cambiar las credenciales de acceso para hacer la conexión con un servicio diferente, debera descargar y modificar el codigo en la ruta server\conection\mongo.js y cambiar los valores de las credenciales de las siguientes lineas

---

```
const mongoURL = process.env.MONGO_URL || 'Ip_del_pod';
const mongoUser = process.env.MONGO_USER || 'mongo_user_name';
const mongoPass = process.env.MONGO_PASS || 'Password';
const mongoDBName = process.env.MONGO_DB_NAME || 'mongo_db_name';
```

**a.** Para saber la Ip del pod donde se ha desplegado el servicio de MongoDB para el despliegue, dirijase a Applications -> Deployments -> mongodb y vera una pantalla como la siguiente, seleccione el numero del ultimo despliegue realizado.

<p align="center">
<img width="778" alt="img4" src="https://user-images.githubusercontent.com/40369712/77023613-5909a980-695a-11ea-8cbf-632c363c5353.png">
</p>
 
**b.**	Dirijase al final de la pagina y seleccione el nombre del pod donde se ha desplegado el servicio.

<p align="center">
<img width="773" alt="img5" src="https://user-images.githubusercontent.com/40369712/77023743-b30a6f00-695a-11ea-89e0-612636db6b98.png">
</p>

**c.**	Identifique la Ip del pod, la cual debera ser asignada en la configuración de la conexión de la aplicación.

<p align="center">
<img width="775" alt="img6" src="https://user-images.githubusercontent.com/40369712/77023847-f238c000-695a-11ea-987b-e40c7bafe08c.png">
</p>

**d.**
En este repositorio encontrara las plantillas y el procedimiento para aprovisionar los siguientes recursos:

* **(Infraestructura) Crear subredes en vpc's existentes. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_is_subnet%20(on%20an%20existing%20vpc))** 🚀
* **(Infraestructura) Crear una VPC en un grupo de recursos determinado. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_is_vpc)** 🚀
* **(Instancia de servicio de Watson Assistant) Crear una instancia de Speech to Text. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_service_instance%20(speech%20to%20text))** 🚀
* **(Instancia de servicio VSI) Crear una instancia de servidor virtual en una vpc existente. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_is_instance%20(VSI))** 🚀



# Referencias 📖

* [Documentación oficial IBM Cloud Provider V1.0.0](https://ibm-cloud.github.io/tf-ibm-docs/v1.0.0/)
* [Automatizar el aprovisionamiento de recursos en la nube con Terraform (Docs IBM)](https://cloud.ibm.com/docs/terraform?topic=terraform-getting-started)
* [Algunos ejemplos](https://github.com/IBM-Cloud/terraform-provider-ibm/tree/master/examples)
