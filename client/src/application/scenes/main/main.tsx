import { Box, Container, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, Switcher } from './components';
// import { useQuery } from '@apollo/react-hooks';
// import { LISTINGS } from 'client/libs/graphql/queries';
// import {
//   Listings as ListingsData,
//   ListingsVariables,
// } from 'client/libs/graphql/queries/Listings/__generated__/Listings';
// import { ListingsFilter } from 'client/libs/graphql/globalTypes';
// import { HomeHero, HomeListings, HomeListingsSkeleton } from './components';

// import { displayErrorMessage } from 'client/libs/utils';

export function Main() {
  // Receive data from gql in converted format such as { vaccinated: number; deaths: number; }
  // => Hence, create an enum to convert object.keys to string and insert into the card

  // const { data, loading } = useQuery<ListingsData, ListingsVariables>(
  //   LISTINGS,
  //   {
  //     variables: {
  //       filter: ListingsFilter.PRICE_HIGH_TO_LOW,
  //       limit: 4,
  //       page: 1,
  //     },
  //     fetchPolicy: 'cache-and-network',
  //   }
  // );

  const generateReadableCaption = useCallback(() => {
    return 'caption';
  }, []);

  useEffect(() => {}, []);

  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  return (
    <Container className="home">
      <Box>
        <Typography>{generateReadableCaption()}</Typography>
        <Switcher />
      </Box>
      {/* <FilteringOptions></FilteringOptions> */}
      {/* {Object.entries(data).map(([key, value] as [typeof keyof ENUM, number]) => {
        <Card title={ENUM[key]} content={value.toString()}></Card>;
      })} */}
    </Container>
  );
}
