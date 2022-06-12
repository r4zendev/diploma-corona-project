import axios from 'axios';
import * as cheerio from 'cheerio';

export async function mapCountryCode(twoLetter: string) {
  try {
    const { data: html } = await axios.get(
      'https://www.iban.com/country-codes'
    );

    const $ = cheerio.load(html);

    const threeLetter = $('td')
      .filter(function () {
        return $(this).text().trim() === twoLetter.toUpperCase();
      })
      .next()
      .text();

    return threeLetter;
  } catch (error) {
    throw error;
  }
}
