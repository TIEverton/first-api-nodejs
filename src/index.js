const http = require('http');
const { URL } = require('url');

const routes = require('./routes')

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3333${request.url}`)

  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`)

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean)

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`
    id = splitEndpoint[1];
  }

  const route = routes.find((routesObj) => (
    routesObj.endpoint === pathname && routesObj.method === request.method
  ))

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams)
    request.params = { id };
    route.handler(request, response)
  } else {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  }
})

server.listen(3333, () => console.log('🔥 Server started at http://localhost:3333'))