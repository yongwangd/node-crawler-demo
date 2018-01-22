const { staticCrawler } = require('sleepydog');
const cheerio = require('cheerio');

let { pageSource$, queueLink, link$ } = staticCrawler({
  domain: 'https://www.goodreads.com',
  startFrom: '/quotes'
});

pageSource$.subscribe(result => {
  console.log(result.url);
  let $ = cheerio.load(result.src);
  $('.quotes .quote .authorOrTitle')
    .toArray()
    .map(a => $(a).text())
    .forEach(console.log);

  $('.paginator a')
    .toArray()
    .map(a => $(a).attr('href'))
    .map(queueLink);

  // $('.previous_page').nextAll('a').toArray().map(a => $(a).attr('href')).forEach(addLink);
});

link$.subscribe(l => console.log(l, 'link'));
