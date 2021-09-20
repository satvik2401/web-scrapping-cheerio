# web-scrapping-cheerio

1. Use postman to send post request at port 5000(i.e.localhost:5000/scrape) with url(i.e.{"url":"your_url"}. 
2. This will obtain URL
3. Perform get request at port 5000.(i.e.localhost:5000/scrape).
4. This will parse the URL to obtain required data.
5. Data is obtained in a new file called output.json.
6. THis is a RESTful api to perform web scrapping.
7. Modules used are request, express, cheerio,fs.
