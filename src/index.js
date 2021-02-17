import Server from './server';
import config from './config/configurations';

const server = new Server(config);

server.bootstrap().run();
