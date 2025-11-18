# Factura
<div>
  <p>
Para esta Tarea 3 partiremos del ejercicio de la Tarea 2

En la plantilla electron en el fichero index.js tenemos puesto las propiedades contextIsolation y nodeIntegration que permiten ejecutar código de módulos Node.js directamente en los renderer processes.

Esto se considera una mala praxis de programación y en su lugar únicamente el main process debería ejecutar código de módulos Node.js y utilizando mecanismo de intercomunicación de procesos (IPCs) proporcionar funcionalidad a los renderer processes

Para ello en esta tarea tenemos que rehacer el ejercicio de la tarea 2, pero quitando del fichero index.js las propiedades contextIsolation y nodeIntegration

Además deberemos incorporar menus para Añadir Articulos (quitaremos el click sobre la imahen), Borrar factura de la pantalla (quitaremos el botón), Eliminar factura (quitaremos el boton), Cargar una factura buscando el fichero en el disco, ... 
</p>
</div>
