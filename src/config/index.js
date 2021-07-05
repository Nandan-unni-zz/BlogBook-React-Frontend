const ENV = process.env.NODE_ENV;

const development = {
  ENV: "development",
  BASE_API_URL: "http://localhost:8000",
};

const production = {
  ...development,
  ENV: "production",
  BASE_API_URL: "https://blogbookapi.herokuapp.com",
};

const configs = { production, development };

const currentConfig = configs[ENV];

export const config = {
  ENV: currentConfig.ENV,
  BASE_API_URL: currentConfig.BASE_API_URL,
};
