import axios from 'axios';
import * as cheerio from 'cheerio';

(async () => {
  try {
    const { data: html } = await axios.get(
      'https://www.iban.com/country-codes'
    );

    const $ = cheerio.load(html);

    const resObj = {};

    $('td').each((i, el) => {
      if (i % 4 === 0) {
        resObj[$(el).next().text()] = {
          name: $(el)
            .text()
            .replace(/,|\(.*\)/g, '')
            .trim(),
          isoCode: $(el).next().next().text(),
        };
      }
    });

    console.log(resObj);
  } catch (error) {
    throw error;
  }
})();
