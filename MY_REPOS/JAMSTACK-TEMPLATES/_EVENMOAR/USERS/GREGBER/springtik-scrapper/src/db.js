import Sequelize from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.get('database.uri'));

// Require all models
require('./models/viator-activity').default(sequelize);

export default sequelize;
