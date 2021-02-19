export default {
    getAllExamination: async (parent, args, context) => {
      const { dataSources: { examinationApi } = {} } = context;
      const response = await examinationApi.getAll();
      return response;
    },
}