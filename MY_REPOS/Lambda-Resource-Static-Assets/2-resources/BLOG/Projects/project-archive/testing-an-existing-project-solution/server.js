const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

const { mergeCategories } = require('./merge-categories');
const { getBodyFromRequest } = require('./get-body-from-request');
const { getValueFromBody } = require('./get-value-from-body');
const { saveCategories } = require('./save-categories');
const { saveItems } = require('./save-items');
const { mergeItems } = require('./merge-items');
const { searchItems } = require('./search-items');

let categories = ['Fun', 'Work', 'School'];
let items = [];
const server = http.createServer(async (req, res) => {
  if (req.url === "/categories" && req.method === 'GET') {
    const filePath = path.join(__dirname, 'category-list-screen.html');
    const template = await fs.promises.readFile(filePath, 'utf-8');
    const html = mergeCategories(template, categories, 'li');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write(html);
  }

  else if (req.url === "/categories" && req.method === 'POST') {
    const body = await getBodyFromRequest(req);
    const newCategory = getValueFromBody(body, 'categoryName')
    categories = saveCategories(categories, newCategory);
    res.setHeader('Location', '/categories');
    res.writeHead(302);
  }

  else if (req.url === "/items/new" && req.method === 'GET') {
    const filePath = path.join(__dirname, 'todo-form-screen.html');
    const template = await fs.promises.readFile(filePath, 'utf-8');
    const html = mergeCategories(template, categories, 'option');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write(html);
  }

  else if (req.url === "/items" && req.method === 'GET') {
    const filePath = path.join(__dirname, 'list-of-items-screen.html');
    const template = await fs.promises.readFile(filePath, 'utf-8');
    const html = mergeItems(template, items);
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write(html);
  }

  else if (req.url === "/items" && req.method === 'POST') {
    const body = await getBodyFromRequest(req);
    const category = getValueFromBody(body, 'category')
    const title = getValueFromBody(body, 'title')
    items = saveItems(items, { title, category });
    res.setHeader('Location', '/items');
    res.writeHead(302);
  }

  else if (req.url.startsWith('/items/') && req.method === 'POST') {
    const index = Number.parseInt(req.url.substring(7)) - 1;
    items[index].isComplete = true;
    res.setHeader('Location', '/items');
    res.writeHead(302);
  }

  else if (req.url.startsWith('/search') && req.method === 'GET') {
    const [_, query] = req.url.split('?', 2);
    const { term } = querystring.parse(query);
    const filePath = path.join(__dirname, 'search-items-screen.html');
    const template = await fs.promises.readFile(filePath, 'utf-8');
    let foundItems = [];
    if (term) {
      foundItems = searchItems(items, term);
    }
    const html = mergeItems(template, foundItems);
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write(html);
  }
  res.end();
});

console.log('Listening on port 3000. Go to http://localhost:3000/items...')

server.listen(3000);
