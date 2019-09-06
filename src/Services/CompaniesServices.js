import apisauce from 'apisauce';
import { commonMonitor } from './index';
import { ICompany } from 'Interfaces';

const create = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar por todas as empresas
   * @param {Object} params - Query string para pesquisa
   */
  const getAllCompanies = (params: Object = {}): Promise => api.get('/v1/companies/', params);

  /**
   * Endpoint responsável por retornar uma empresa
   * @param {number} id - Id da empresa
   */
  const getCompanyById = (id: number): Promise => api.get(`/v1/companies/${id}`);

  /**
   * Endpoint responsável por cadastrar uma nova empresa
   * @param {ICompany} company - Empresa a ser cadastrada
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeCompany = (company: ICompany): Promise => api.post('/v1/companies/', company);

  /**
   * Endpoint responsável por atualizar uma empresa
   * @param {number} id - Id da empresa
   * @param {ICompany} company - Dados da empresa a ser atualizado
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateCompany = (id: number, company: ICompany): Promise => api.put(`/v1/companies/${id}/`, company);

  /**
   * Endpoint responsável por remover o investimento selecionada
   * @param {number} id - Id da empresa
   */
  const destroyCompanyById = (id: number): Promise => api.delete(`/v1/companies/${id}/`);

  return {
    config: api,
    getAllCompanies,
    getCompanyById,
    storeCompany,
    updateCompany,
    destroyCompanyById
  };
};

export default { create };
