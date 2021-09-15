import path from 'path';
import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  session: {
    secret: {
      doc: 'The session secret',
      format: String,
      default: 'secret',
    },
    redis: {
      url: {
        doc: 'Redis url',
        format: String,
        env: 'REDIS_URL',
        default: 'redis://localhost:6379',
      },
    },
  },
  server: {
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 0,
      env: 'PORT',
    },
  },
  amqp: {
    url: {
      doc: 'RabbitMQ url',
      format: String,
      default: 'amqp://localhost',
      env: 'CLOUDAMQP_URL',
    },
  },
  google: {
    apiKeys: {
      geocoding: {
        doc: 'Google API key',
        format: String,
        default: 'AIzaSyDcuEw2FxINqJW32cO0A8Dd03-J1ZnVPZ0',
      },
    },
  },
});

const env = config.get('env');
config.loadFile(path.join(__dirname, `../config/${env}.json`));
config.validate();

export default config;
