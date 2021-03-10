export default {
  getAllResult: async (parent, args, context) => {
    const { dataSources: { resultApi } = {} } = context;
    const response = await resultApi.getAll();
    return response;
  },

  getOneResult: async (parent, args, context) => {
    const { id = '' } = args;
    const { dataSources: { resultApi } = {} } = context;
    const response = await resultApi.getOne(id);
    return response;
  },
};
