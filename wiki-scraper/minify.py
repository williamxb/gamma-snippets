import re

input = open("output.html", "r")
output = open("output-minify.html", "w")

content = input.read()
minified_content = re.sub(r'\s+', ' ', content)
minified_content = re.sub(r'\>\ \<', '><', minified_content)
output.write(minified_content)

print("done")

input.close()
output.close()