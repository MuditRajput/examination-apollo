import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import GraphQLJSON from 'graphql-type-json';
import { userQuery, userMutation } from './user';
import { traineeMutation, traineeQuery, traineeSubscription } from './trainee';
import { examinationQuery, examinationMutation } from './examination';
import { questionMutation, questionQuery } from './question';
import { resultQuery } from './result';

const dirname = path.resolve();

const typesArray = fileLoader(path.join(dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    JSON: GraphQLJSON,
    Query: {
      ...traineeQuery,
      ...userQuery,
      ...examinationQuery,
      ...questionQuery,
      ...resultQuery,
    },
    Mutation: {
      ...userMutation,
      ...traineeMutation,
      ...examinationMutation,
      ...questionMutation,
    },
    Subscription: traineeSubscription,
  },
  typeDefs,
};
