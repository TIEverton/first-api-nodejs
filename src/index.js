const http = require('http');

const routes = require('./routes')

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`)

  const route = routes.find((routesObj) => (
    routesObj.endpoint === request.url && routesObj.method === request.method
  ))

  if (route) {
    route.handler(request, response)
  } else {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(`Cannot ${request.method} ${request.url}`)
  }
})

server.listen(3333, () => console.log('🔥 Server started at http://localhost:3333'))