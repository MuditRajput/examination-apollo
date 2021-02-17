import pubsub from '../pubsub';
import constants from '../Constants';

const { subscriptions: { traineeAdded, traineeUpdated, traineeDeleted } } = constants;

export default {
  traineeAdded: {
    subscribe: () => pubsub.asyncIterator([traineeAdded]),
  },
  traineeUpdated: {
    subscribe: () => pubsub.asyncIterator([traineeUpdated]),
  },
  traineeDeleted: {
    subscribe: () => pubsub.asyncIterator([traineeDeleted]),
  },
};
