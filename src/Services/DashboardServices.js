import apisauce from 'apisauce';
import Config from 'Config';
import { commonMonitor } from './index';

const create = (baseURL = Config.API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar os dados gerais
   * @param {Object} params - Query string para pesquisa
   */
  const getDashboardGeneral = (params: Object = {}): Promise => api.get('/v1/dashboard-general/', params);

  /**
   * Endpoint responsável por retornar o faturamento geral com meses
   * @param {Object} params - Query string para pesquisa
   */
  const getDashboardGeneralWithMonths = (params: Object = {}): Promise =>
    api.get('/v1/dashboard-general-with-months', params);

  /**
   * Endpoint responsável por retornar o investimentos
   * @param {Object} params - Query string para pesquisa
   */
  const getDashboardGeneralInvestments = (params: Object = {}): Promise =>
    api.get('/v1/dashboard-general-investments', params);

  return {
    config: api,
    getDashboardGeneral,
    getDashboardGeneralWithMonths,
    getDashboardGeneralInvestments
  };
};

export default { create };
