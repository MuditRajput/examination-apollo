export default {
  loginUser: async (parent, args, context) => {
    const { payload } = args;
    const { dataSources: { userApi } = {} } = context;
    const response = await userApi.loginUser(payload);
    return response;
  },
};
