const DEBUG = process.env.NODE_ENV === 'development';

export default {
  DEBUG,
  APP_NAME: 'FinancesApp',
  API_BASE_URL: DEBUG ? 'http://localhost:3333/api' : 'https://finances-app-backend.herokuapp.com/api'
};
