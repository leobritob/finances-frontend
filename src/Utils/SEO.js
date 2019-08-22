import CONFIG from "Config";

export default {
  changeDocumentTitle: (title: string): void => {
    document.title = `${title} - ${CONFIG.APP_NAME}`;
  }
};
