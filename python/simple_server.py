import socket
import os
import cgi

import BaseHTTPServer
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler


class MyHandle(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        with open('test.html', 'rb') as f:
            self.wfile.write(f.read())
        return None

    def do_POST(self):
        if self.path == '/token':
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={
                    'REQUEST_METHOD': 'POST',
                    'CONTENT_TYPE': self.headers['Content-Type']
                    }
            )

            print 'Recieve token: {0}'.format(form['token'].value)

            with open('token.txt', 'wb') as f:
                f.write(form['token'].value)

            self.send_response(200)
            self.end_headers()
            self.wfile.write("Done")


def run_server(
        server_class=BaseHTTPServer.HTTPServer,
        handler_class=BaseHTTPServer.BaseHTTPRequestHandler):

    server_address = ('127.0.0.1', 8080)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == '__main__':
    run_server(handler_class=MyHandle)
