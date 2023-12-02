# Biblioteca_express

Se desarrollo una aplicación web que permita almacenar información sobre el préstamo de un libro un archivo de texto(txt) en un servidor web y a su vez permita la descarga de dicho archivo.

Para ello se tuvo en cuenta:

Construir un servidor HTTP en express

Se creo una página html tipo formulario desde donde se enviarán los datos del usuario que hace la solicitud(id, nombre y apellido) y del libro solicitado(titulo, autor, editorial, año). 
para devolver dicha página configure un middleware para el uso de archivos estáticos, el directorio que contiene la página debe llamarse 'public'.

En el formulario todos los datos son requeridos, si falta alguno redireccione a una página error.html (desde el servidor)
Los archivos se almaceno en el directorio del servidor llamado 'data', para almacenarlos se incluyo fs - 'file system'.
El envio de los datos se hará a través del método POST, se incluyo middleware que permite leer los datos del body del request.
la estructura del archivo txt es la siguiente:
Nombre del archivo: id_123.txt

Contenido del archivo: id, nombre, apellido,titulo, autor, editorial, año

El archivo txt se debe descargar una vez sea generada la solicitud.
