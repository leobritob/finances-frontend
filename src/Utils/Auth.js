import { format } from "date-fns";
import { store } from "Config/Store";
import { updateHeaderAuthToken } from "Services";

export default {
  /**
   * Método responsável por decodificar o token JWT
   * @param token
   * @returns {any}
   */
  tokenDecode: (token: string) => {
    if (token) {
      let tokenArray = token.split(".");
      let tokenDecodeBase64 = window.atob(tokenArray[1]);
      const payload = JSON.parse(tokenDecodeBase64);

      const expires_in = format(payload.exp * 1000);

      return {
        ...payload,
        expires_in
      };
    }
  },

  /**
   * Método responsável por verificar se o usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const storeApp = store.getState();

    updateHeaderAuthToken(storeApp.user.token);

    return !!storeApp.user.token;
  },

  /**
   * Método responsável por verificar as permissões do usuário
   * @param {string[]} slug - Slugs de permissões
   * @returns {boolean}
   */
  verifyRole: (slug: string[]): boolean => {
    const {
      user: { roles }
    } = store.getState();

    let result = false;
    slug.forEach(
      (slugItem: string): boolean => {
        const verify = roles.map(role => role.slug).includes(slugItem);
        if (verify) {
          if (!result) {
            result = true;
          }
        }
      }
    );

    return result;
  }
};
