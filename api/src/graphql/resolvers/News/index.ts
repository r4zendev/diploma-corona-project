import axios from 'axios';
import snoowrap from 'snoowrap';
import shuffle from 'lodash.shuffle';

import { NewsType } from 'api/libs/types';
import { NewsData, NYTPost, RedditPost } from './types';

export const newsResolvers = {
  Query: {
    news: async (_root: undefined): Promise<NewsData[]> => {
      try {
        const redditDriver = new snoowrap({
          userAgent: process.env.DEFAULT_USER_AGENT,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
        });

        const subredditPosts: RedditPost[] = await redditDriver
          .getSubreddit('covid19')
          .getNew();

        const redditFormatted = subredditPosts.map((post) => ({
          type: NewsType.REDDIT,
          title: post.title,
          url: post.url,
          createdDate: post.created,
          imageUrl: post.thumbnail,
          byString: `By ${post.author_fullname}`,
        }));

        const { data } = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=covid&api-key=${process.env.NYT_API_KEY}`
        );

        const { docs }: { docs: NYTPost[] } = data.response;

        const nytFormatted: NewsData[] = docs.map((news) => {
          const imageObj = news.multimedia.find((el) => el.type === 'image');

          return {
            type: NewsType.NYT,
            title: news.lead_paragraph,
            url: news.web_url,
            createdDate: new Date(news.pub_date).getTime() / 1000,
            imageUrl: imageObj
              ? `https://www.nytimes.com/${imageObj.url}`
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/NewYorkTimes.svg/2560px-NewYorkTimes.svg.png',
            byString: news.byline.original,
          };
        });

        const newsFormatted = [...redditFormatted, ...nytFormatted];

        return shuffle(newsFormatted);
      } catch (error) {
        throw new Error(`Failed to query data: ${error}`);
      }
    },
  },
};
