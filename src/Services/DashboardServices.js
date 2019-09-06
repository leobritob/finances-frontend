import apisauce from 'apisauce';
import { commonMonitor } from './index';

const create = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
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

  /**
   * Endpoint responsável por gerar pdf do dashboard geral
   * @param {Object} params - Query string para pesquisa
   */
  const getDashboardGeneralPdf = (params: Object = {}): Promise => {
    return api.get('/v1/dashboard-general-pdf/', params, { responseType: 'arraybuffer' }).then(res => {
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank', '');
    });
  };

  return {
    config: api,
    getDashboardGeneral,
    getDashboardGeneralWithMonths,
    getDashboardGeneralInvestments,
    getDashboardGeneralPdf
  };
};

export default { create };
