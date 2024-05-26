const net = require('net');

const hostname = '127.0.0.1';
const port = 3000;

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const request = data.toString();
    const [headers, ...body] = request.split('\r\n');
    const [method, url, protocol] = headers.split(' ');

    console.log(`Method: ${method}`);
    console.log(`URL: ${url}`);
    console.log(`Protocol: ${protocol}`);

    const responseBody = 'Hello, World!\n';
    const response = 
      `HTTP/1.1 200 OK\r\n` +
      `Content-Length: ${responseBody.length}\r\n` +
      `Content-Type: text/plain\r\n` +
      `\r\n` +
      responseBody;

    socket.write(response);
    socket.end();
  });

  socket.on('error', (err) => {
    console.error(err);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
