export default {
    createExamination: async (parent, args, context) => {
      const { dataSources: { examinationApi } = {} } = context;
      const { subject, description, maximumMarks, time } = args;
      const response = await examinationApi.create({ subject, description, maximumMarks, time });
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
        const { dataSources: { examinationApi, questionApi } = {} } = context;
        const response = await examinationApi.deleteExam(id);
        questionApi.deleteAllQuestions(id)
        return response;
    },
}
