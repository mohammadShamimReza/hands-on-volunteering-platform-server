import { Server } from 'http';
import { Server as sockerServer } from 'socket.io';
import app from './app';
import config from './config';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  const io = new sockerServer(server, { cors: { origin: '*' } });

  io.on('connection', socket => {
    console.log('a user connected');
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}




bootstrap();
