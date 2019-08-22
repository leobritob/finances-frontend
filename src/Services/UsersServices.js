import apisauce from "apisauce";
import Config from "Config";
import { commonMonitor } from "./index";
import { IUser } from "Interfaces";

const create = (baseURL = Config.API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000
  });

  api.addMonitor(commonMonitor);

  /**
   * Endpoint responsável por buscar por todos os usuários
   * @param {Object} params - Query string para pesquisa
   */
  const getAllUsers = (params: Object = {}): Promise => api.get("/v1/users/", params);

  /**
   * Endpoint responsável por retornar os dados do usuário selecionado
   * @param {number} id - Id do usuário
   */
  const getUsersById = (id: number): Promise => api.get(`/v1/users/${id}`);

  /**
   * Endpoint responsável por cadastrar um novo usuário
   * @param {IUser} user - Cliente a ser cadastrado
   * @returns {Promise<ApiResponse<any>>}
   */
  const storeUser = (user: IUser): Promise => api.post("/v1/users/", user);

  /**
   * Endpoint responsável por atualizar os dados de um usuário
   * @param {number} id - Id do usuário
   * @param {IUser} user - Dados do usuário a ser atualizada
   * @returns {Promise<ApiResponse<any>>}
   */
  const updateUser = (id: number, user: IUser): Promise => api.put(`/v1/users/${id}/`, user);

  /**
   * Endpoint responsável por remover o usuário selecionada
   * @param {number} id - Id do usuário
   */
  const destroyUser = (id: number): Promise => api.delete(`/v1/users/${id}/`);

  return {
    config: api,
    getAllUsers,
    getUsersById,
    storeUser,
    updateUser,
    destroyUser
  };
};

export default { create };
