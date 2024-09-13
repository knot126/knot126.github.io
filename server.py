#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json
import time
from subprocess import run

BLOG_PATH = "blog"

def parse_title_and_desc(md):
	title = ""
	desc = ""
	
	for l in md.splitlines():
		if not title and l.startswith("# "):
			title = l[2:]
		
		if not desc and l and not l.startswith(("<", "# ")):
			desc = l
		
		if title and desc:
			break
	
	return (title, desc)

class BlogIndex:
	def __init__(self, path):
		self.path = path
		self.items = json.loads(Path(f"{path}/blog.json").read_text())
	
	def get_index(self, filename):
		for i in range(len(self.items)):
			if self.items[i]["file"] == filename:
				return i
		
		return None
	
	def get_entry(self, filename):
		index = self.get_index(filename)
		
		if index == None:
			self.items.append({}.copy())
			return self.items[-1]
		else:
			return self.items[index]
	
	def update_page(self, filename, content):
		"""
		Update a page entry
		"""
		
		data = self.get_entry(filename)
		
		data["file"] = filename
		
		if "time" not in data:
			data["time"] = int(time.time())
		
		title, desc = parse_title_and_desc(content)
		
		data["title"] = title
		data["desc"] = desc
		
		# Save page and index
		self.write_page(filename, content)
		self.save()
	
	def write_page(self, filename, content):
		Path(f"{self.path}/{filename}").write_text(content)
	
	def save(self):
		"""
		Save the blog index file
		"""
		
		Path(f"{self.path}/blog.json").write_text(json.dumps(self.items))

index = BlogIndex(BLOG_PATH)

def add_commit_push():
	run(["git", "add", "."])
	run(["git", "commit", "--no-gpg-sign", "-m", "Automatic blog update"])
	run(["git", "push", f"https://{Path('access.conf').read_text().strip()}@github.com/knot126/Website.git"])

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
			# print(f"save file: {info['page']} with contents: {info['content']}")
			index.update_page(info['page'], info['content'])
			
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
