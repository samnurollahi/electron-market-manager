const { ipcRenderer, contextBridge } = require("electron");

console.log("preload ...");

contextBridge.exposeInMainWorld("myApi", {
  getProducts: async () => {
    return await ipcRenderer.invoke("getProducts");
  },
  opend: async () => {
    return await ipcRenderer.invoke("opend");
  },
  addProduct: async (product) => {
    return await ipcRenderer.invoke("addProduct", product);
  },
  deleteProduct: async (id) => {
    return await ipcRenderer.invoke("deleteProduct", id);
  },
  dec: async (id) => {
    return await ipcRenderer.invoke("dec", id);
  },
  getTheme: async () => {
    return await ipcRenderer.invoke("getTheme");
  },
});
