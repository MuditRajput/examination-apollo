export default {
    createExamination: async (parent, args, context) => {
      const { dataSources: { examinationApi } = {} } = context;
      const { subject } = args;
      console.log(subject);
      const response = await examinationApi.create({ subject });
      return response;
    },
    updateExamination: async (parent, args, context) => {
        const { dataSources: { examinationApi } = {} } = context;
        const { payload: { originalId, dataToUpdate } } = args;
        const response = await examinationApi.update({ originalId, dataToUpdate });
        return response;
    },
    deleteExamination: async (parent, args, context) => {
        const { id = '' } = args;
        const { dataSources: { examinationApi } = {} } = context;
        const response = await examinationApi.deleteExam(id);
        return response;
    },
}