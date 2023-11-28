const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log('Usuário %s conectado no servidor.', socket.id)

  socket.on('entrar-na-sala', (sala) => {
    socket.join(sala)
    console.log('Usuário %s entrou na sala %s.', socket.id, sala)

    let jogadores = {}
    if (io.sockets.adapter.rooms.get(sala).size === 1) {
      jogadores = {
        primeiro: socket.id,
        segundo: undefined
      }
    } else if (io.sockets.adapter.rooms.get(sala).size === 2) {
      const [primeiro] = io.sockets.adapter.rooms.get(sala)
      jogadores = {
        primeiro,
        segundo: socket.id
      }
      console.log(
        'Sala %s com 2 jogadores. Partida pronta para iniciar.',
        sala
      )
    }

    io.to(sala).emit('jogadores', jogadores)
  })
  socket.on('botaoc2-publicar', (sala, estado) => {
    socket.to(sala).emit('botaoc2-notificar', estado)
  })
  socket.on('alavanca2-publicar', (sala, estado) => {
    socket.to(sala).emit('alavanca2-notificar', estado)
  })
  socket.on('portasobe2-publicar', (sala, estado) => {
    socket.to(sala).emit('portasobe2-notificar', estado)
  })
  socket.on('estado-publicar', (sala, estado) => {
    socket.to(sala).emit('estado-notificar', estado)
  })

  socket.on('artefatos-publicar', (sala, artefatos) => {
    socket.to(sala).emit('artefatos-notificar', artefatos)
  })

  socket.on('cena-publicar', (sala, cena) => {
    socket.to(sala).emit('cena-notificar', cena)
  })

  socket.on('offer', (sala, description) => {
    socket.to(sala).emit('offer', description)
  })

  socket.on('candidate', (sala, candidate) => {
    socket.to(sala).emit('candidate', candidate)
  })

  socket.on('answer', (sala, description) => {
    socket.to(sala).emit('answer', description)
  })

  socket.on('disconnect', () => { })
})

app.use(express.static('../cliente/'))
server.listen(PORT, () =>
  console.log(`Servidor em execução na porta ${PORT}!`)
)
