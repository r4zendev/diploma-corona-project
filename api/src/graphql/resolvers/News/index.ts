// import axios from 'axios';
import snoowrap from 'snoowrap';

import { NewsData, NewsArgs } from './types';

export const newsResolvers = {
  Query: {
    news: async (
      _root: undefined,
      { country: _ }: NewsArgs
    ): Promise<NewsData[]> => {
      try {
        const redditDriver = new snoowrap({
          userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
          clientId: 'DJ0XrWFTJzInsaFJbmvUAQ',
          clientSecret: '_u2XNGr1Yge2GblG97z6k-TVFYfzaA',
          refreshToken: '460065877747-NwJyoMaltkyhGEq2e0SDeEmyDFKnQg',
        });

        const subredditPosts = await redditDriver
          .getSubreddit('covid19')
          .getNew();
        console.log(subredditPosts);

        return subredditPosts as unknown as NewsData[];
      } catch (error) {
        throw new Error(`Failed to query data: ${error}`);
      }
    },
  },
};
