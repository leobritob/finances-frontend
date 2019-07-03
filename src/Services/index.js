import {  history } from 'Config/Store';

export const commonMonitor = (response: ApiResponse): void => {
  if (![200, 201, 204].includes(response.status)) {
  }

  if (response.status === 401) {
    history.push('/login');
  }

  if (response.status === 500) {
  }
};

const Services = {
};

export const updateHeaderAuthToken = (token: string): void => {
  if (token) {
    Object.keys(Services).forEach(index => {
      if (Services[index].hasOwnProperty('config')) {
        Services[index].config.setHeader('Authorization', `Bearer ${token}`);
      }
    });
  }
};

export default Services;
