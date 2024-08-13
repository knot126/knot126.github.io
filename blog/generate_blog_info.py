import json, os

files = [x for x in os.listdir() if os.path.isfile(x) and x.endswith(".md")]
output = []

# print(files)

for fn in files:
	with open(fn, "r") as f:
		l = f.readline()
		data_raw = l[4:-4].split(";")
		data = {}
		
		for d in data_raw:
			items = d.split("=")
			data[items[0]] = items[1]
		
		data["url"] = f"./blog.html?page={fn}"
		
		output.append(data)

with open("blog.json", "w") as f:
	f.write(json.dumps(output))
