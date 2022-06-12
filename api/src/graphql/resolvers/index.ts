import merge from 'lodash.merge';
import { newsResolvers } from './News';
import { statsResolvers } from './Stats';

export const resolvers = merge(statsResolvers, newsResolvers);
