import cheerio from 'cheerio';
import rp from 'request-promise';

export default ({pageIndex}) => {
  console.log('-------------------------------------');
  console.log(`Will scrap viator page: ${pageIndex}`);
  console.log('-------------------------------------');

  return rp({
    uri: `https://www.viatorcom.fr/ajax-getProducts.jspa?destinationID=51&PUID=7379&sortBy=SCORE&pageIndex=${pageIndex}`,
    transform(body) {
      return cheerio.load(body);
    }
  })
    .then($ => {
      return $('.card').toArray().reduce((data, card) => {
        const a = $(card).find('.card-title a');
        const link = a.attr('href');
        const title = a.text();
        data.push({link, title, pageIndex});
        return data;
      }, []);
    });
};
