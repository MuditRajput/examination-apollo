export default {
  getAllTrainees: async (parent, args, context) => {
    const {
      options: {
        skip = 0, limit = 0, sortBy = '', sortOrder = '',
      } = {},
    } = args;
    const { dataSources: { traineeApi } = {} } = context;
    const response = await traineeApi.getAll({
      skip, limit, sortBy, sortOrder,
    });
    return response;
  },
  getOneTrainee: async (parent, args, context) => {
    const { id = '' } = args;
    const { dataSources: { traineeApi } = {} } = context;
    const response = await traineeApi.getOneTrainee(id);
    return response;
  },
};
