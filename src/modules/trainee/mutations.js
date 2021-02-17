import pubsub from '../pubsub';
import constants from '../Constants';

const { subscriptions: { traineeAdded, traineeUpdated, traineeDeleted } } = constants;

export default {
  createTrainee: async (parent, args, context) => {
    const { dataSources: { traineeApi } = {} } = context;
    const {
      user: {
        email, role, name, password,
      },
    } = args;
    const response = await traineeApi.create({
      email, role, name, password,
    });
    pubsub.publish(traineeAdded, { traineeAdded: response });
    return response;
  },

  updateTrainee: async (parent, args, context) => {
    const { id = '', dataToUpdate: { name, email } = {} } = args;
    const { dataSources: { traineeApi } = {} } = context;
    const response = await traineeApi.update({ originalId: id, dataToUpdate: { email, name } });
    pubsub.publish(traineeUpdated, { traineeUpdated: response });
    return response;
  },

  deleteTrainee: async (parent, args, context) => {
    const { id = '' } = args;
    const { dataSources: { traineeApi } = {} } = context;
    const response = await traineeApi.deleteTrainee(id);
    pubsub.publish(traineeDeleted, { traineeDeleted: response });
    return response;
  },
};
