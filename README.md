## DrakorID API Scraper
Get Drakor series/movies from DrakorID
![](https://s1.zerochan.net/Sousou.no.Frieren.600.3456279.jpg)
## Usage

## Basic
### Installation 
```sh
npm install github:xct007/drakor-api-scraper
```
or using yarn
```sh
yarn add github:xct007/drakor-api-scraper
```
Import module
- ```CommonJS```
```js
const drakor = require('drakor-api-scraper')
// or
const { latest, search, detail } = require('drakor-api-scraper')
```
- ```ESM```
```js
import drakor from 'drakor-api-scraper'
// or
import { latest, search, detail } from 'drakor-api-scraper'
```
### Example
- Get ```latest``` drakor
```js
import drakor from 'drakor-api-scraper'

const output = 20 // default 10
drakor
    .latest(output)
    .then((json) => {
       console.log(json)
    })
```
 - output
```js
{
  "status": 'ok',
  "count": 10,
  "count_total": 467,
  "pages": 1,
  "categories": [
    {
      "cid": 1440,
      "category_name": 'Outrun by Running Man',
      "category_type": 'Variety Show',
      "count_anime": '14',
      "img_url": String,
      "days": 7,                                                              
      "rating": '8.80',
      "years": '2021',
      "total_views": 173337,
      "ongoing": 1
    },
   ...
}
```
- ```search``` drakor by **query**
```js
import drakor from 'drakor-api-scraper'

const query = "goblin" // string
drakor
    .search(query)
    .then((json) => {
       console.log(json)
    })
```
 - output
```js
{
  found: true,
  status: 'ok',
  count: 20,
  count_total: 2,                                                       
  pages: 1,
  categories: [
    {
      cid: 195,
      category_name: 'Goblin',
      category_type: 'Serial Drama Korea',
      count_anime: '19',
      img_url: String,
      days: 0,
      rating: '9.00',
      years: 2016,
      total_views: 2072015,
      ongoing: 0
    },
    {
      cid: 625,
      category_name: 'Kiss Goblin',
      category_type: 'Serial Drama Korea',
      count_anime: '12',
      img_url: String,
      days: 0,
      rating: '8.00',
      years: 2020,
      total_views: 393542,
      ongoing: 0
    }
  ]
}
```
- Get drakor ```detail``` by ```cid/category_id``` or ```channel_id```
```js
import drakor from 'drakor-api-scraper';

const id = 2010
drakor
    .detail(id)
    .then((json) => {
       console.log(json)
    })
```
 - output if **id"* is ```cid```
```js
{
  status: 'ok',
  count: 20,
  count_total: 3,
  pages: 1,
  category: {
    cid: 2010,
    category_name: 'Justice Bao the Legend of Young',
    category_type: 'Serial Drama China',
    img_url: String,
    rating: '7.50',
    ongoing: 1,
    genre: 'Thriller, Historical, Mystery, Law',
    years: 2022
  },
  posts: [
    {
      channel_id: 35459,
      category_id: 2010,
      channel_name: 'Justice Bao the Legend of Young E03',
      category_name: 'Justice Bao the Legend of Young',
      category_type: 'Serial Drama China',
      created: '2022-12-18 13:05:50',
      count_view: '298',
      img_url: String,
      is_hd_available: true,
      ongoing: 1,
      rating: '7.50',
      years: 2022,
      genre: 'Thriller, Historical, Mystery, Law'
    },
    ...
  ]
}
```
 - output if **id** is ```channel_id```
```js
{
  status: 'ok',
  channel_description: String, // html format
  channel_name: 'Justice Bao the Legend of Young E01',
  channel_id: 35407,
  category_id: '2010',
  category_name: 'Justice Bao the Legend of Young',
  category_type: 'Serial Drama China',                                  
  channel_url: String,                                             
  channel_url_hd: String | '',
  is_hd_available: true,
  embed_url: '',
  ongoing: 1,
  download_url: '',
  img_url: String,
  genre: 'Thriller, Historical, Mystery, Law',
  rating: '7.50',
  years: 2022
}
```
