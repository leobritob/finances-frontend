//@flow
import apisauce, { ApiResponse } from 'apisauce';
import { commonMonitor } from './index';
import { IGeneralReports, IGeneralReportsInvestments, IGeneralReportsWithMonths } from 'Interfaces';

const create = (baseURL: string = process.env.REACT_APP_API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000,
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar os dados gerais
   * @param {Object} params - Query string para pesquisa
   * @returns {ApiResponse<IGeneralReports>}
   */
  const getDashboardGeneral = (params: {}): Promise<ApiResponse<IGeneralReports>> =>
    api.get('/v1/dashboard-general/', params);

  /**
   * Endpoint responsável por retornar o faturamento geral com meses
   * @param {Object} params - Query string para pesquisa
   * @returns {ApiResponse<IGeneralReportsWithMonths>}
   */
  const getDashboardGeneralWithMonths = (params: {}): Promise<ApiResponse<IGeneralReportsWithMonths>> =>
    api.get('/v1/dashboard-general-with-months', params);

  /**
   * Endpoint responsável por retornar o investimentos
   * @param {Object} params - Query string para pesquisa
   */
  const getDashboardGeneralInvestments = (params: {}): Promise<ApiResponse<IGeneralReportsInvestments>> =>
    api.get('/v1/dashboard-general-investments', params);

  /**
   * Endpoint responsável por gerar pdf do dashboard geral
   * @param {Object} params - Query string para pesquisa
   */
  const getDashboardGeneralPdf = (params: {}): Promise => {
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
    getDashboardGeneralPdf,
  };
};

export default { create };
