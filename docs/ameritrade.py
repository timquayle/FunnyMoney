from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from urlparse import parse_qs
import requests
import ssl

class Handler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        #Get the Auth Code
        print("hihihi")
        path, _, query_string = self.path.partition('?')
        code = parse_qs(query_string)['code'][0]

        #Post Access Token Request
        headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        data = { 'grant_type': 'authorization_code', 'access_type': 'offline', 'code': code, 'client_id': 'OAuth User ID', 'redirect_uri': 'Redirect URI' }
        auth_reply = requests.post('https://api.tdameritrade.com/v1/oauth2/token', headers=headers, data=data)
        
        #returned just to test that it's working
        self.wfile.write(auth_reply.text.encode())

httpd = HTTPServer(('127.0.0.1', 8888), Handler)

httpd.socket = ssl.wrap_socket (httpd.socket,
        keyfile='key.pem',
        certfile='certificate.pem', server_side=True)

httpd.serve_forever()