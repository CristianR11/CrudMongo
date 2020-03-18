# Despliegue de Mongo BD + node.js CRUD
Laboratorio para el aprovisionamiento de un servicio persistente de Mongo DB y su conexión con una app crud en node js

## Requerimentos para la ejecucion de la guia

*	Tener una cuenta de IBM Cloud.
*	Contar con un cluster de Openshift 3.11.

## Indice

* Crear un nuevo proyecto en el cluster de Openshift
* Aprovisione el servicio Mongo DB en un contenedor de Opeshift
* Configure las variables de entorno para la conección del CRUD con el servicio de Mongo DB
* Despliegue de la aplicación CRUD node js


### 1. Crear un nuevo proyecto en el cluster de Openshift

**a.**	Una vez abierta la consola web de Openshift
  
  
 ```
 mkdir terraform && cd terraform
```

**b.**  [Descargue la versión 0.12.19 de Terraform CLI en su máquina local.](https://releases.hashicorp.com/terraform/)

El archivo de instalación quedara alojado en la carpeta de descargas que tenga configurada por defecto, por lo que debe entrar a la c arpeta de descargas para extraer el archivo.

```
cd $HOME/Downloads
```
**c.**	Extraiga el paquete Terraform y copie el archivo binario en su directorio terraform.

```
unzip terraform_0.12.19_linux_amd64.zip
sudo mv terraform $HOME/terraform
```

**d.**	Apunte la variable de entorno $ PATH a su archivo binario Terraform.

```
export PATH=$PATH:$HOME/terraform
```
**e.**	Verifique que la instalación sea exitosa

```
Terraform --version
```
Vera una salida de consola como la siguiente:
```
Terraform v0.12.19
```
### 2.	Instale el complemento IBM Cloud Provider 🛠️

**a.** [Descargue la versión v1.0.0 del archivo binario de IBM Cloud Provider.](https://github.com/IBM-Cloud/terraform-provider-ibm/releases)

Ingrese a la carpeta de descargas y extraiga el archivo binario del plug-in, para el caso particular se ha descargado la versión para Linux de 64 bits.

```
cd $HOME/Downloads
unzip linux_amd64.zip
```

**b.**	Cree una carpeta oculta para su complemento.

```
mkdir $HOME/.terraform.d/plugins
```
**c.**	Mueva el complemento de IBM Cloud Provider plug-in en la carpeta oculta que acaba de crear

```
mv $HOME/Downloads/terraform-provider-ibm* $HOME/.terraform.d/plugins/
```
**d.**	Ingrese a la carpeta occulta y verifique que la instalación se haya terminado

```
cd $HOME/.terraform.d/plugins && ./terraform-provider-ibm_*
```
Vera una salida como la siguiente:

```
2020/01/14 06:59:57 IBM Cloud Provider version 1.0.0  
This binary is a plugin. These are not meant to be executed directly.
Please execute the program that consumes these plugins, which will
load any plugins automatically
```
### 3.	Configure el complemento plug-in de IBM Cloud Provider 🛠️

**a.**	Cree una carpeta en su máquina local para su primer proyecto Terraform y navegue hacia la carpeta. Esta carpeta se utiliza para almacenar todos los archivos de configuración y definiciones de variables.

```
cd $HOME
mkdir myproject && cd myproject
```
**b.**  [Cree un API Key de IBM Cloud](https://cloud.ibm.com/docs/iam?topic=iam-classic_keys&locale=es) para aprovisionar la instancia de servidor virtual VPC.

**c.**  [Genere una llave SSH.](https://cloud.ibm.com/docs/vpc-on-classic-vsi?topic=vpc-on-classic-vsi-ssh-keys&locale=es) La llave SSH es requerida para aprovisionar la instancia de servidor virtual VPC y puede usarla para acceder a su instancia via SSH. Luego de crear su llave SSH, asegúrese de [cargarla en su cuenta de IBM Cloud.](https://cloud.ibm.com/docs/vpc-on-classic-vsi?topic=vpc-on-classic-vsi-managing-ssh-keys&locale=es#managing-ssh-keys-with-ibm-cloud-console)

**d.**  [Recupere su nombre de usuario y API Key de infraestructura clásica de IBM Cloud.](https://cloud.ibm.com/docs/iam?topic=iam-classic_keys&locale=es) Usted usara estas credenciales para aprovisionar la instancia de servidor virtual en su cuenta de IBM Cloud.

**e.**	Cree un archivo de configuración de Terraform que se llame terraform.tfvars para almacenar sus credenciales de infraestructura clásicas de IBM Cloud y la clave API de IBM Cloud. Asegúrese de guardar este archivo en la carpeta que creó para su primer proyecto Terraform. Terraform carga automáticamente las variables definidas en el archivo terraform.tfvars cuando se inicializa la CLI de Terraform y puede hacer referencia a ellas en cada archivo de configuración de Terraform que utilice.

```
cd $HOME/myproject
touch terraform.tfvars
```

Edite este archivo de configuración con la siguiente información para cargar los valores a las variables de configuración.
📄
```
iaas_classic_username = "<classic_infrastructure_username>"
iaas_classic_api_key =  "<classic_infrastructure_apikey>"
ibmcloud_api_key = " <ibmcloud_api_key>"
ssh_key = "<name_of-publick_key>"
```

A modo de ejemplo puede editar el archivo terraform.tfvars con el siguiente comando.

```
vi terraform.tfvars
```


**f.**	Cree un archivo de configuración de Terraform que se llame provider.tf

Utilice este archivo para configurar el complemento de IBM Cloud Provider con las credenciales de su archivo terraform.tfvars para que el complemento pueda acceder y aprovisionar recursos de IBM Cloud. Para hacer referencia a una variable del archivo terraform.tfvars, use la sintaxis _var.<variable_name>.

 📄
``` 
variable "iaas_classic_username" { }
variable "iaas_classic_api_key" { }
variable "ibmcloud_api_key" { }

provider "ibm" {
  iaas_classic_username = var.iaas_classic_username
  iaas_classic_api_key  = var.iaas_classic_api_key
  ibmcloud_api_key	= var.ibmcloud_api_key
  generation	= 1
  región = "us-south"
}
```

**g.**	Inicialice Terraform

```
terraform init
```

En este repositorio encontrara las plantillas y el procedimiento para aprovisionar los siguientes recursos:

* **(Infraestructura) Crear subredes en vpc's existentes. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_is_subnet%20(on%20an%20existing%20vpc))** 🚀
* **(Infraestructura) Crear una VPC en un grupo de recursos determinado. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_is_vpc)** 🚀
* **(Instancia de servicio de Watson Assistant) Crear una instancia de Speech to Text. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_service_instance%20(speech%20to%20text))** 🚀
* **(Instancia de servicio VSI) Crear una instancia de servidor virtual en una vpc existente. [ir](https://github.com/emeloibmco/IBM-Cloud-Provision-Terraform-/tree/master/ibm_is_instance%20(VSI))** 🚀



# Referencias 📖

* [Documentación oficial IBM Cloud Provider V1.0.0](https://ibm-cloud.github.io/tf-ibm-docs/v1.0.0/)
* [Automatizar el aprovisionamiento de recursos en la nube con Terraform (Docs IBM)](https://cloud.ibm.com/docs/terraform?topic=terraform-getting-started)
* [Algunos ejemplos](https://github.com/IBM-Cloud/terraform-provider-ibm/tree/master/examples)
