from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import requests
import shutil
import time
from selenium.webdriver.chrome.service import Service


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
serv = Service('/home/mseguel/Escritorio/HIto 2/webscraper/chromedriver')

data = pd.read_csv('../assets/fifa_20_data.csv')
driver = webdriver.Chrome(service=serv,chrome_options=chrome_options)

for row in data.itertuples():
    name_bruto = row.name
    name = name_bruto.replace(" ", "_")
    url = f'https://es.wikipedia.org/wiki/{name}'
    driver.get(url)

    time.sleep(2.5)

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    class_image = soup.find_all('a', attrs={'class': 'image'})
    if len(class_image) > 0:
        src = class_image[0].find('img')['src']
        img = requests.get(f'https:{src}')
        open(f'players/{name_bruto}.png', 'wb').write(img.content)
    else:
        shutil.copy("../assets/players/balon.png",f"players/{name_bruto}.png")
