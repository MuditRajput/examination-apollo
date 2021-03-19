export default {
  getAllQuestions: async (parent, args, context) => {
    const { dataSources: { questionApi } = {} } = context;
    const { id = '', timeLimit = 0, submitted = 'true' } = args;
    const response = await questionApi.getAll(id, { timeLimit, submitted });
    return response;
  },
};
