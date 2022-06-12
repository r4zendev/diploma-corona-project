import { NewsType } from 'api/libs/types';

export interface RedditPost {
  selftext: string;
  author_fullname: string;
  title: string;
  thumbnail: string;
  created: number; // timestamp UNIX
  permalink: string;
  url: string;
}

export interface NYTPost {
  lead_paragraph: string;
  web_url: string;
  headline: { main: string; print_headline?: string };
  pub_date: string; // iso string
  image: { url: string };
  multimedia: { type: string; url: string }[];
  byline: { original: string };
}

export interface NewsData {
  type: NewsType;
  title: string;
  url: string;
  createdDate: number;
  imageUrl: string;
  byString: string;
}
