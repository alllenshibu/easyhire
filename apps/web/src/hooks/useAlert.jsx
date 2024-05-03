export const useAlert = () => {
  const showAlert = (title = "", description = "") => {
    alert(title);
  };

  return showAlert;
};
