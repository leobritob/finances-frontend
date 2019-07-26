import apisauce from "apisauce";
import Config from "Config";
import { commonMonitor } from "./index";
import { IBillingCycles } from "Interfaces";

const create = (baseURL = Config.API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar por todos os ciclos de faturamentos
   * @param {Object} params - Query string para pesquisa
   */
  const getAllBillingCycles = (params: Object = {}): Promise =>
    api.get("/v1/billing-cycles/", params);

  /**
   * Endpoint responsável por retornar um ciclo de faturamento
   * @param {number} id - Id do ciclo de faturamento
   */
  const getBillingCyclesById = (id: number): Promise =>
    api.get(`/v1/billing-cycles/${id}`);

  /**
   * Endpoint responsável por cadastrar um novo ciclo de faturamento
   * @param {IBillingCycles} billingCycles - Cliente a ser cadastrado
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeBillingCycles = (billingCycles: IBillingCycles): Promise =>
    api.post("/v1/billing-cycles/", billingCycles);

  /**
   * Endpoint responsável por atualizar um ciclo de faturamento
   * @param {number} id - Id do ciclo de faturamento
   * @param {IBillingCycles} billingCycles - Dados do ciclo de faturamento a ser atualizado
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateBillingCycles = (
    id: number,
    billingCycles: IBillingCycles
  ): Promise => api.put(`/v1/billing-cycles/${id}/`, billingCycles);

  /**
   * Endpoint responsável por remover o ciclo de faturamento selecionada
   * @param {number} id - Id do ciclo de faturamento
   */
  const destroyBillingCycles = (id: number): Promise =>
    api.delete(`/v1/billing-cycles/${id}/`);

  /**
   * Endpoint responsável por buscar o relatório dos ciclos de faturamentos
   * @param {Object} params - Query string para pesquisa
   */
  const getBillingCyclesReports = (params: Object = {}): Promise =>
    api.get("/v1/billing-cycles-reports/", params);

  return {
    config: api,
    getAllBillingCycles,
    getBillingCyclesById,
    storeBillingCycles,
    updateBillingCycles,
    destroyBillingCycles,
    getBillingCyclesReports
  };
};

export default { create };
