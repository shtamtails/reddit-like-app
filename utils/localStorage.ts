export const writeToLocalStorage = (name: string, object: any): void => {
  const stringifiedObject = JSON.stringify(object);
  window.localStorage.setItem(name, stringifiedObject);
};

export const readFromLocalStorage = (name: string) => {
  const parsedObject = window.localStorage.getItem(name);
  return parsedObject && JSON.parse(parsedObject);
};

export const deleteFromLocalStorage = (name: string) => {
  window.localStorage.removeItem(name);
};
