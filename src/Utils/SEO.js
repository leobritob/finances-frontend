export default {
  changeDocumentTitle: (title: string): void => {
    document.title = `${title} - ${process.env.REACT_APP_NAME}`;
  }
};
