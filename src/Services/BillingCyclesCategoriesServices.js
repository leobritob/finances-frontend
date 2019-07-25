import apisauce from "apisauce";
import Config from "Config";
import { commonMonitor } from "./index";
import { IBillingCyclesCategories } from "Interfaces";

const create = (baseURL = Config.API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar por todas as categorias de ciclos de faturamentos
   * @param {Object} params - Query string para pesquisa
   * @returns {Promise<ApiResponse<any>>}
   */
  const getAllBillingCyclesCategories = (params: Object = {}): Promise =>
    api.get("/v1/billing-cycles-categories/", params);

  /**
   * Endpoint responsável por retornar uma categoria de ciclo de faturamento
   * @param {number} id - Id da categoria de ciclo de faturamento
   * @returns {Promise<ApiResponse<any>>}
   */
  const getBillingCyclesCategoriesById = (id: number): Promise =>
    api.get(`/v1/billing-cycles-categories/${id}`);

  /**
   * Endpoint responsável por cadastrar uma nova categoria de faturamento
   * @param {IBillingCyclesCategories} billingCyclesCategories - Nova categoria de ciclo de faturamento a ser cadastrada
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeBillingCyclesCategories = (
    billingCyclesCategories: IBillingCyclesCategories
  ): Promise =>
    api.post("/v1/billing-cycles-categories/", billingCyclesCategories);

  /**
   * Endpoint responsável por atualizar uma categoria de ciclo de faturamento
   * @param {number} id - Id da categoria de ciclo de faturamento
   * @param {IBillingCyclesCategories} billingCyclesCategories - Dados da categoria de ciclo de faturamento a ser atualizada
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateBillingCyclesCategories = (
    id: number,
    billingCyclesCategories: IBillingCyclesCategories
  ): Promise =>
    api.put(`/v1/billing-cycles-categories/${id}/`, billingCyclesCategories);

  /**
   * Endpoint responsável por remover uma categoria de ciclo de faturamento selecionada
   * @param {number} id - Id da categoria de ciclo de faturamento
   * @returns {Promise<ApiResponse<any>>}
   */
  const destroyBillingCyclesCategories = (id: number): Promise =>
    api.delete(`/v1/billing-cycles-categories/${id}/`);

  return {
    config: api,
    getAllBillingCyclesCategories,
    getBillingCyclesCategoriesById,
    storeBillingCyclesCategories,
    updateBillingCyclesCategories,
    destroyBillingCyclesCategories
  };
};

export default { create };
