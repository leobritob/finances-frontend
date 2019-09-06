import apisauce from 'apisauce';
import { commonMonitor } from './index';
import { IInvestments } from 'Interfaces';

const create = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar por todos os investimentos
   * @param {Object} params - Query string para pesquisa
   */
  const getAllInvestments = (params: Object = {}): Promise => api.get('/v1/investments/', params);

  /**
   * Endpoint responsável por retornar um investimento
   * @param {number} id - Id do investimento
   */
  const getInvestmentsById = (id: number): Promise => api.get(`/v1/investments/${id}`);

  /**
   * Endpoint responsável por cadastrar um novo investimento
   * @param {IInvestments} investments - Investimento a ser cadastrado
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeInvestments = (investments: IInvestments): Promise => api.post('/v1/investments/', investments);

  /**
   * Endpoint responsável por atualizar um investimento
   * @param {number} id - Id do investimento
   * @param {IInvestments} investments - Dados do investimento a ser atualizado
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateInvestments = (id: number, investments: IInvestments): Promise =>
    api.put(`/v1/investments/${id}/`, investments);

  /**
   * Endpoint responsável por remover o investimento selecionada
   * @param {number} id - Id do investimento
   */
  const destroyInvestments = (id: number): Promise => api.delete(`/v1/investments/${id}/`);

  /**
   * Endpoint responsável por buscar o relatório dos investimentos
   * @param {Object} params - Query string para pesquisa
   */
  const getInvestmentsReports = (params: Object = {}): Promise => api.get('/v1/investments-reports/', params);

  return {
    config: api,
    getAllInvestments,
    getInvestmentsById,
    storeInvestments,
    updateInvestments,
    destroyInvestments,
    getInvestmentsReports
  };
};

export default { create };
