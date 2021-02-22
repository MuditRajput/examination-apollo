export default {
    getAllQuestions: async (parent, args, context) => {
      const { dataSources: { questionApi } = {} } = context;
      const { id = '' } = args;
      const response = await questionApi.getAll(id);
      return response;
    },
}