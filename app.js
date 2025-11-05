const path = require("path");

const electron = require("electron");

const db = require("./config/db");

const main = () => {
  const mainWindow = new electron.BrowserWindow({
    title: "myApp",
    width: 700,
    height: 850,

    webPreferences: {
      preload: path.join(electron.app.getAppPath(), "preloads", "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile("./views/index.html");
  mainWindow.webContents.openDevTools();
  // console.log(response);
};

electron.app.on("ready", async () => {
  main();

  // const products = await Product.findAll();
  // console.log(products);
});

// handel
require("./handel");

db.sync()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
