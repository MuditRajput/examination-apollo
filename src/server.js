import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import cors from 'cors';
import Schema from './modules';
import {
  UserApi, TraineeApi, ExaminationApi, QuestionApi, ResultApi,
} from './datasource';

class Server {
  constructor(config) {
    this.config = config;
    this.app = express();
  }

  corsParser() {
    console.log('inside cors');
    this.app.use(cors());
  }

  bootstrap() {
    this.setupApollo(Schema);
    this.setupRoutes();
    this.corsParser();
    return this;
  }

  setupApollo(schema) {
    this.server = new ApolloServer({
      ...schema,
      dataSources: () => ({
        userApi: new UserApi(),
        traineeApi: new TraineeApi(),
        examinationApi: new ExaminationApi(),
        questionApi: new QuestionApi(),
        resultApi: new ResultApi(),
      }),
      context: ({ req }) => {
        if (req) {
          return { token: req.headers.authorization };
        }
        return {};
      },
    });
    this.httpServer = createServer(this.app);
    this.server.installSubscriptionHandlers(this.httpServer);
  }

  setupRoutes() {
    const { app } = this;
    app.get('/health-check', (req, res) => {
      res.send('I am OK');
    });
    this.server.applyMiddleware({ app });
  }

  run() {
    const { config: { port } } = this;
    this.httpServer.listen(port, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`app is running on port ${port}`);
    });
  }
}
export default Server;
