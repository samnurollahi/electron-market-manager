const electron = require("electron");

const Product = require("./models/product");

electron.ipcMain.handle("opend", async () => {
  const result = await electron.dialog.showOpenDialog();
  return result;
});

electron.ipcMain.handle("addProduct", async (event, product) => {
  try {
    await Product.create(product);
    return { msg: "ok" };
  } catch (err) {
    console.log(err);
    return { msg: "no", err };
  }
});

electron.ipcMain.handle("getProducts", async () => {
  return await Product.findAll();
});

electron.ipcMain.handle("deleteProduct", async (event, id) => {
  try {
    await Product.destroy({
      where: {
        id,
      },
    });

    return { msg: "ok" };
  } catch (err) {
    console.log(err);
    return { msg: "no", err };
  }
});

electron.ipcMain.handle("dec", async (event, id) => {
  try {
    const product = await Product.findByPk(id);
    if (product.dataValues.count == 0) {
      return { msg: "ok" };
    }
    if (!product) {
      throw new Error("error");
    }

    await Product.update(
      {
        count: product.dataValues.count - 1,
      },
      {
        where: {
          id,
        },
      }
    );

    return { msg: "ok" };
  } catch (err) {
    console.log(err);
    return { msg: "no", err };
  }
});

electron.ipcMain.handle("getTheme", () => {
  return electron.nativeTheme.shouldUseDarkColors ? "dark" : "ligth";
});
