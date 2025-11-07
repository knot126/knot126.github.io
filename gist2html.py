#!/usr/bin/env python3
"""
Convert a GitHub gist into an HTML page for my blog
"""

import re
import base64
from sys import argv
from urllib.request import urlopen
from pathlib import Path

def download(url, decode=True):
	print(f"Download: {url}")
	with urlopen(url) as req:
		return req.read() if not decode else req.read().decode('utf-8')

def convert(gist):
	html = re.search(r'<article[^>]+>(.*)</article>', gist, flags=re.DOTALL)[1]
	title = re.search(r'<strong class="user-select-contain gist-blob-name css-truncate-target">([^<]*)</strong>', gist, flags=re.DOTALL)[1].strip().removesuffix(".md")
	
	print(f"Post title: {title}")
	
	for url in re.findall(r'href="(https?://[^"]+)"', html):
		if ".png" in url:
			data = download(url, False)
			html = html.replace(url, "data:image/png;base64," + base64.b64encode(data).decode('utf-8'))
	
	html = f'<html><head><title>{title} — Knot\'s Blog</title><link rel="stylesheet" href="/common/github-markdown.css"/><style>.markdown-body .anchor {{ display: none !important; }}</style></head><body><div class="markdown-body" style="margin: auto; max-width: 987px;">{html}</div></body></html>'
	
	return html, title

def main():
	gist = download(argv[1])
	html, title = convert(gist)
	path = f"blog/{title.replace(' ', '-').lower()}.html"
	Path(path).write_text(html)
	
	index = Path(f"blog/index.html").read_text()
	bullet = f'<li><a href="/{path}">{title}</a></li>'
	if bullet not in index:
		index = index.replace("<!-- Insert new entries here -->", f"<!-- Insert new entries here -->\n\t\t\t\t{bullet}")
	Path(f"blog/index.html").write_text(index)

if __name__ == "__main__":
	main()
