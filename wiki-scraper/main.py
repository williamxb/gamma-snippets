from bs4 import BeautifulSoup
import requests
f = open("output.html", "w")

url = 'https://www.gammacommunications.de/wiki/crown-centrex-team'
response = requests.get(url)

if response.status_code == 200:
	soup = BeautifulSoup(response.content, 'html.parser')
	content = soup.find('main', class_='content')

else:
    exit(f"Failed to fetch page: {response.status_code}")

# pass list of elements used to find_all
### caveat: including 'table' tag here means matching nested tags will be included in the output. beware!
content_items = content.find_all(['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'table'])

# write found content
for item in content_items:
    # print(f'{item}\n\n------') # debug
    f.write(f'{item}\n')
    
print("done")