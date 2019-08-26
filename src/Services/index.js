import { history, store } from 'Config/Store';
import UsersServices from './UsersServices';
import AuthServices from './AuthServices';
import { toast } from 'react-toastify';
import HandleErrors from 'Exceptions/Handler';
import BillingCyclesServices from './BillingCyclesServices';
import BillingCyclesTypesServices from './BillingCyclesTypesServices';
import BillingCyclesCategoriesServices from './BillingCyclesCategoriesServices';
import InvestmentsServices from './InvestmentsServices';
import UserActions from 'Redux/UserRedux';

export const commonMonitor = (response: ApiResponse): void => {
  if (![200, 201, 204].includes(response.status)) {
    const errorsMessages = HandleErrors.parseErrors(response.data);

    if (errorsMessages) toast.error(errorsMessages);
  }

  if (response.status === 401) {
    history.push('/login');
    store.dispatch(UserActions.logout());
  }

  if (response.status === 500) {
  }
};

const Services = {
  user: UsersServices.create(),
  auth: AuthServices.create(),
  billingCycles: BillingCyclesServices.create(),
  billingCyclesTypes: BillingCyclesTypesServices.create(),
  billingCyclesCategories: BillingCyclesCategoriesServices.create(),
  investments: InvestmentsServices.create()
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
