export const writeToLocalStorage = (name: string, object: any): void => {
  /* Converting the object to a string and then saving it to local storage. */
  const stringifiedObject = JSON.stringify(object);
  window.localStorage.setItem(name, stringifiedObject);
};

export const readFromLocalStorage = (name: string) => {
  /* Checking if parsedObject is truthy, if it is, it will return the parsedObject from localstorage. */
  const parsedObject = window.localStorage.getItem(name);
  return parsedObject && JSON.parse(parsedObject);
};

export const deleteFromLocalStorage = (name: string) => {
  /* Removing the item from local storage. */
  window.localStorage.removeItem(name);
};
