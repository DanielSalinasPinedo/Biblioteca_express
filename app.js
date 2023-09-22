const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

// Middleware para archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: true }));

// Redireccionamiento
app.get('/', (req, res) => {
  res.redirect('/formulario');
});

// Ruta para mostrar el formulario HTML
app.get('/formulario', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});

// Ruta para procesar el formulario y crear un préstamo
app.post('/prestamo', (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  // Verifica si todos los campos están completos
  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    return res.redirect('/error');
  }

  // Crea el archivo de préstamo en el directorio 'data'
  const contenido = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${año}`;
  const archivoNombre = `data/id_${id}.txt`;

  fs.writeFile(archivoNombre, contenido, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error interno del servidor.');
    }

    // Envía una respuesta HTML con un script que muestra la alerta
    const respuestaHTML = `
    <html>
    <head>
      <title>Éxito</title>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </head>
    <body>
      <script>
      Swal.fire({
        title: "Prestamo",
        text: "Préstamo creado con éxito.",
        icon: "success",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: true
      }).then(() => {
          window.location.href = '/formulario';
        });
      </script>
    </body>
    </html>    
    `;

    res.send(respuestaHTML);
  });
});

// Ruta para mostrar una página de error
app.get('/error', (req, res) => {
  res.sendFile(__dirname + '/public/error.html');
});

// Ruta para descargar un archivo de préstamo
app.get('/descargar/:id', (req, res) => {
  const id = req.params.id;
  const archivoNombre = `data/id_${id}.txt`;

  // Verifica si el archivo existe y lo envía para su descarga
  if (fs.existsSync(archivoNombre)) {
    res.download(archivoNombre, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al descargar el archivo.');
      }
    });
  } else {
    res.status(404).send('El archivo no existe.');
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
