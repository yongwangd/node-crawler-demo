const { staticCrawler } = require('flaming');
const cheerio = require('cheerio');

let { pageSource$, queueLink, data$ } = staticCrawler({
  domain: 'https://movie.douban.com/top250'
});

pageSource$.subscribe(({ url, src }) => {
  console.log('url is ', url);
  let $ = cheerio.load(src);
  $('.item .title')
    .toArray()
    .map(a => $(a).text())
    .map(data => console.log(data));

  $('.paginator a')
    .toArray()
    .map(a => $(a).attr('href'))
    .map(queueLink);
});

var count = 0;
data$.subscribe(d => {
  count++;
  console.log(d, count);
});
