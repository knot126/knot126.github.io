#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json

class RequestHandler(SimpleHTTPRequestHandler):
	def do_GET(self):
		if self.path == "/common/main.js":
			data = Path("./common/main.js").read_bytes().replace(b"var knwbEnableEditor = false;", b"var knwbEnableEditor = true;")
			self.send_response(200)
			self.send_header("Content-Length", str(len(data)))
			self.send_header("Content-Type", "text/javascript")
			self.end_headers()
			self.wfile.write(data)
		else:
			super().do_GET()
	
	def do_POST(self):
		if self.path == "/api/save":
			info = json.loads(self.rfile.read(int(self.headers["Content-Length"])).decode("utf-8"))
			print(f"save file: {info['page']} with contents: {info['content']}")
			
			self.send_response(200)
			self.send_header("Content-Length", "0")
			self.send_header("Content-Type", "text/plain")
			self.end_headers()
		else:
			self.send_response(404)
			self.send_header("Content-Length", "0")
			self.send_header("Content-Type", "text/plain")
			self.end_headers()

server = ThreadingHTTPServer(('127.0.0.1', 8000), RequestHandler)
server.serve_forever()
