//@flow
import apisauce from 'apisauce';
import { commonMonitor } from './index';

const create = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {},
    timeout: 10000,
  });

  api.addMonitor(commonMonitor);

  /**
   * Método responsável por gerar um token de autorização ao usuário
   * @param {string} email - E-mail do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<ApiResponse<any>>}
   */
  const token = (email: string, password: string): Promise =>
    api.post('/auth/token', { email, password });

  /**
   * Método responsável por atualizar o token de autorização
   * @param {string} token - Token do usuário
   * @returns {Promise<ApiResponse<any>>}
   */
  const refreshToken = (token: string): Promise =>
    api.post('/auth/refresh-token', token);

  /**
   * Método responsável por verificar se o usuário está autenticado
   * @returns {Promise<ApiResponse<any>>}
   */
  const check = (): Promise => api.get('/auth/check');

  /**
   * Método responsável por retonar os dados do usuário autenticado
   * @returns {Promise<ApiResponse<any>>}
   */
  const me = (): Promise => api.get('/auth/me');

  /**
   * Endpoint responsável por resetar senha do usuário
   * @param {string} hash - Hash para permitir alteração de senha do usuário
   * @param {string} newPassword - Nova senha do usuário
   * @param {string} confirmNewPassword - Confirmação da nova senha do usuário
   * @returns {Promise<ApiResponse<any>>}
   */
  const changePassword = (
    hash: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise =>
    api.post(`/auth/change-password/${hash}/`, {
      newPassword,
      confirmNewPassword,
    });

  /**
   * Endpoint responsável por resetar senha do usuário
   * @param {string} email - E-mail do usuário
   * @returns {Promise<ApiResponse<any>>}
   */
  const resetPassword = (email: string): Promise =>
    api.post('/auth/reset-password/', { email });

  return {
    config: api,
    token,
    refreshToken,
    check,
    me,
    changePassword,
    resetPassword,
  };
};

export default { create };
