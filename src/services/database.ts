import mongoose from 'mongoose';
import { commonFieldsPLugin } from '../plugins/commonFields';
import { mongooseErrorHandler } from '../plugins/errors';

export default {
  async connect() {
    const stageArg = ((process.argv.filter((x) => x.startsWith('--db='))[0] || '').split('--db='))[1];
    const user = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    const databaseName = stageArg || process.env.DATABASE_NAME;
    const host = process.env.DATABASE_HOST;

    console.info('Connecting to database ' + databaseName + '...');
    const uri = `mongodb+srv://${user}:${password}@${host}/${databaseName}?retryWrites=true&w=majority`;
    try {
      return mongoose.connect(uri);
    } catch (error) {
      console.error('Error connecting to database: ', error);
    }
  },

  setupSchema(schema: mongoose.Schema) {
    //* Aplicar o plugin de campos comuns
    schema.plugin(commonFieldsPLugin);
    schema.plugin(mongooseErrorHandler);
  }
};