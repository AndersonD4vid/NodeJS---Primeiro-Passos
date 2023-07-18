const express = require('express');

const server = express();
server.use(express.json());

const cursos = [
   'NodeJS',
   'NextJS',
   'Prisma',
   'PostgreSQL'
]

// Middleware Global
// adicionamos o next para seguir o fluxo
server.use((req, res, next) => {
   console.log(`URL chamada: ${req.url}`);

   return next();
})


// Create, criando um curso
server.post('/cursos', checkCurso, (req, res) => {
   const { name } = req.body;
   cursos.push(name);

   return res.json(cursos);
})

// Middleware de verificação
function checkCurso(req, res, next) {
   if (!req.body.name) {
      return res.status(400).json({ error: 'Nome do curso é obrigatório!' });
   }

   return next();
}

// Middleware de verificação
function checkIndexCurso(req, res, next) {
   const curso = cursos[req.params.index];

   if (!curso) {
      return res.status(400).json({ error: 'Curso não existe!' });
   }

   req.curso = curso;

   return next();
}

// Read, buscando todos os cursos
server.get('/cursos', (req, res) => {
   return res.json(cursos);
})

// Read, buscando um curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
   //const { index } = req.params;

   return res.json(req.curso);
   //return res.json(cursos[index])
})

// Update, atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
   const { index } = req.params;
   const { name } = req.body;

   cursos[index] = name;

   return res.json(cursos);
})

// Delete, deletando um curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
   const { index } = req.params;

   cursos.splice(index, 1);

   return res.json({ message: 'Curso deletado' });
})






server.listen(3333, () => console.log('Servidor OK'));
