import { gql } from 'apollo-boost';

export const NEWS = gql`
  query News {
    news {
      type
      title
      url
      createdDate
      imageUrl
      byString
    }
  }
`;
