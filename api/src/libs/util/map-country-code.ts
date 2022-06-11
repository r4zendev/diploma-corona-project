import axios from 'axios';
import * as cheerio from 'cheerio';

export async function mapCountryCode(_twoLetter: string) {
  try {
    const { data: html } = await axios.get(
      'https://www.iban.com/country-codes/'
    );

    const $ = cheerio.load(html);

    console.log('$ => ', $);

    // return titles;
  } catch (error) {
    throw error;
  }

  // fetchTitles().then((titles) => console.log(titles));
  // Scrape from https://www.iban.com/country-codes
}
