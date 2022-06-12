const path = require('path');
const dotenv = require('dotenv');
const yup = require('yup');

const {
  name,
  title,
  description,
  version,
  repository,
} = require('./package.json');

// may be unnecessary to read .env file on production
// envs would be available inside Docker image
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve('./.env') });
}

const schema = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'test'])
    .default('development'),

  HOST: yup.string().required(),
  PORT: yup.number(),
  PROTOCOL: yup.string().oneOf(['http', 'https']).default('http'),

  API_URL: yup.string().required(),
  GOOGLE_API_KEY: yup.string().required(),

  PROJECT_SOURCE_DIR: yup.string().default('src'),
  PROJECT_OUTPUT_DIR: yup.string().default('dist'),
});

try {
  schema.validateSync(process.env, { abortEarly: false });
} catch (error) {
  console.log.apply(null, error.errors);

  process.exitCode = 1;
}

const envs = schema.cast(process.env, { stripUnknown: true });

module.exports = {
  DEBUG_BUILD: envs.DEBUG_BUILD,
  NODE_ENV: envs.NODE_ENV,
  IS_DEVELOPMENT: envs.NODE_ENV === 'development',
  IS_PRODUCTION: envs.NODE_ENV === 'production',
  IS_TEST: envs.NODE_ENV === 'test',

  API_URL: envs.API_URL,
  GOOGLE_API_KEY: envs.GOOGLE_API_KEY,

  PROJECT: {
    OUTPUT_DIR: envs.PROJECT_OUTPUT_DIR,
    SOURCE_DIR: envs.PROJECT_SOURCE_DIR,
  },

  APPLICATION: {
    NAME: name,
    VERSION: version,
    BUILD_VERSION: envs.BUILD_VERSION,
    TITLE: title,
    DESCRIPTION: description,
    REPOSITORY: repository,
    HOST: envs.HOST,
    PORT: envs.PORT,
    PROTOCOL: envs.PROTOCOL,
    PUBLIC_URL: `${envs.PROTOCOL}://${envs.HOST}${
      envs.PORT ? `:${envs.PORT}` : ''
    }${envs.NODE_ENV === 'production' ? '/content-ingestion-wizard' : ''}`,
  },
};
