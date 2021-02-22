export default {
    createQuestions: async (parent, args, context) => {
      const { dataSources: { questionApi } = {} } = context;
      const { originalId, questionList } = args;
      const response = await questionApi.create({ originalId, questionList });
      return response;
    },
    updateQuestions: async (parent, args, context) => {
        const { dataSources: { questionApi } = {} } = context;
        const { originalId, dataToUpdate } = args;
        const response = await questionApi.update({ originalId, dataToUpdate });
        return response;
    },
    deleteQuestions: async (parent, args, context) => {
        const { id = '' } = args;
        const { dataSources: { questionApi } = {} } = context;
        const response = await questionApi.deleteQuestions(id);
        return response;
    },
    submitQuestions: async (parent, args, context) => {
        const { answersList, originalId, questionSet } = args;
        const { dataSources: { questionApi } = {} } = context;
        const response = await questionApi.submitQuestions({ answersList, originalId, questionSet });
        return response;
    }
}