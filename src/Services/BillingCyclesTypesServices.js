import apisauce from 'apisauce';
import { commonMonitor } from './index';
import { IBillingCyclesTypes } from 'Interfaces';

const create = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar por todos os tipos de ciclos de faturamentos
   * @param {Object} params - Query string para pesquisa
   * @returns {Promise<ApiResponse<any>>}
   */
  const getAllBillingCyclesTypes = (params: Object = {}): Promise => api.get('/v1/billing-cycles-types/', params);

  /**
   * Endpoint responsável por retornar um tipo de de faturamento
   * @param {number} id - Id do tipo de faturamento
   * @returns {Promise<ApiResponse<any>>}
   */
  const getBillingCyclesTypesById = (id: number): Promise => api.get(`/v1/billing-cycles-types/${id}`);

  /**
   * Endpoint responsável por cadastrar um novo tipo de faturamento
   * @param {IBillingCyclesTypes} billingCyclesTypes - Novo tipo de faturamento a ser cadastrado
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeBillingCyclesTypes = (billingCyclesTypes: IBillingCyclesTypes): Promise =>
    api.post('/v1/billing-cycles-types/', billingCyclesTypes);

  /**
   * Endpoint responsável por atualizar um tipo de ciclo de faturamento
   * @param {number} id - Id do tipo ciclo de faturamento
   * @param {IBillingCyclesTypes} billingCyclesTypes - Dados do tipo de ciclo de faturamento a ser atualizado
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateBillingCyclesTypes = (id: number, billingCyclesTypes: IBillingCyclesTypes): Promise =>
    api.put(`/v1/billing-cycles-types/${id}/`, billingCyclesTypes);

  /**
   * Endpoint responsável por remover um tipo de ciclo de faturamento selecionada
   * @param {number} id - Id do tipo do ciclo de faturamento
   */
  const destroyBillingCyclesTypes = (id: number): Promise => api.delete(`/v1/billing-cycles-types/${id}/`);

  return {
    config: api,
    getAllBillingCyclesTypes,
    getBillingCyclesTypesById,
    storeBillingCyclesTypes,
    updateBillingCyclesTypes,
    destroyBillingCyclesTypes
  };
};

export default { create };
