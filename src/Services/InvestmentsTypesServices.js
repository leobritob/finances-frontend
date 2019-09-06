import apisauce from 'apisauce';
import { commonMonitor } from './index';
import { IInvestmentsTypes } from 'Interfaces';

const create = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar por todos os tipos de investimentos
   * @param {Object} params - Query string para pesquisa
   */
  const getAllInvestmentsTypes = (params: Object = {}): Promise => api.get('/v1/investments-types/', params);

  /**
   * Endpoint responsável por retornar um tipo de investimento
   * @param {number} id - Id do tipo de investimento
   */
  const getInvestmentsTypesById = (id: number): Promise => api.get(`/v1/investments-types/${id}`);

  /**
   * Endpoint responsável por cadastrar um novo investimento
   * @param {IInvestmentsTypes} investments - Investimento a ser cadastrado
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeInvestmentsTypes = (investments: IInvestmentsTypes): Promise =>
    api.post('/v1/investments-types/', investments);

  /**
   * Endpoint responsável por atualizar um tipo de investimento
   * @param {number} id - Id do tipo de investimento
   * @param {IInvestmentsTypes} investments - Dados do tipo de investimento a ser atualizado
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateInvestmentsTypes = (id: number, investments: IInvestmentsTypes): Promise =>
    api.put(`/v1/investments-types/${id}/`, investments);

  /**
   * Endpoint responsável por remover o investimento selecionada
   * @param {number} id - Id do tipo de investimento
   */
  const destroyInvestmentsTypes = (id: number): Promise => api.delete(`/v1/investments-types/${id}/`);

  return {
    config: api,
    getAllInvestmentsTypes,
    getInvestmentsTypesById,
    storeInvestmentsTypes,
    updateInvestmentsTypes,
    destroyInvestmentsTypes
  };
};

export default { create };
