const http = require('http')

const server = createServer = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if('/' === url) {
        console.log('Hello! My first assignment');
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Save</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if('/users' === url) {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>List Of Users</title><head>');
        res.write('<body>');
        res.write('<ul> <li> User1 </li></ul>');
        res.write('<ul> <li> User2 </li></ul>');
        res.write('<ul> <li> User3 </li></ul>');
        res.write('</body>');
        res.write('</html>')
        res.end();
    }

    if('/create-user' === url && 'POST' === method) {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 201;
            res.setHeader('Location', '/');
            return res.end();
        })
    }
});

server.listen(8080);