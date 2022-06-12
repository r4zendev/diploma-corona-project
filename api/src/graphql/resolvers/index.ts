import merge from 'lodash.merge';
import { newsResolvers } from './News';
import { statsResolvers } from './Stats';
import { utilResolvers } from './Util';

export const resolvers = merge(statsResolvers, newsResolvers, utilResolvers);
