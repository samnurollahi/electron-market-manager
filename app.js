const path = require("path");
const fs = require("fs");

const electron = require("electron");
var AutoLaunch = require("auto-launch");

const db = require("./config/db");
// const { getSms } = require("./utils/notif");

const obj = {
  react: true,
  Js: false,
  electron: false,
  Ts: true,
  reactNative: false,
};

const mainMenu = electron.Menu.buildFromTemplate([
  {
    label: "app",
    submenu: [
      { role: "quit" },
      { role: "togglefullscreen" },
      {
        role: "toggleDevTools",
        accelerator: "control + p",
        // icon: electron.nativeImage.createFromPath("./settings.png"),
      },
      {
        label: "programmer",
        submenu: [
          {
            label: "react",
            type: "checkbox",
            checked: true,
            click: () => checkBoxHandler("react"),
          },
          { label: "Js", type: "checkbox", click: () => checkBoxHandler("Js") },
          {
            label: "electron",
            type: "checkbox",
            click: () => checkBoxHandler("electron"),
          },
          {
            label: "Ts",
            type: "checkbox",
            checked: true,
            click: () => checkBoxHandler("Ts"),
          },
          {
            label: "reactNative",
            type: "checkbox",
            click: () => checkBoxHandler("reactNative"),
          },
        ],
      },
    ],
  },
  {
    label: "electron",
  },
]);

// mainMenu.append(new electron.MenuItem({ label: "nodejs" }));
// mainMenu.insert(1, new electron.MenuItem({ label: "reactjs" }));

mainMenu.once("setMenu", () => {
  console.log("menu set shod :)");
});

function checkBoxHandler(name) {
  obj[name] = !obj[name];
  console.log(obj);
}

const main = () => {
  const mainWindow = new electron.BrowserWindow({
    title: "myApp",
    width: 700,
    height: 850,
    icon: "./icon.png",

    webPreferences: {
      preload: path.join(electron.app.getAppPath(), "preloads", "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile("./views/index.html");
  // mainWindow.webContents.openDevTools();
  mainWindow.setMenu(mainMenu);
  mainMenu.emit("setMenu");
  // console.log(response);

  // console.log(mainMenu.items);

  setTimeout(() => {
    mainWindow.removeMenu();
    mainMenu.append(new electron.MenuItem({ role: "toggleDevTools" }));
    mainWindow.setMenu(mainMenu);
  }, 2_000); // 2s

  // native image
  // const empty = electron.nativeImage.createEmpty();
  // console.log(empty.isEmpty());

  // const img = electron.nativeImage.createFromPath("icon.png");
  // console.log(img.isEmpty());
  // console.log(img.getSize());
  // console.log(img.toJPEG(10)); // return buffer

  // img = img.resize({
  //   height: 10,
  //   width: 10,
  //   quality: "good",
  // });

  // console.log(img.toDataURL());
  // console.log(img.toPNG());

  // const imgBuffer = electron.nativeImage.createFromBuffer(img.toJPEG(10));
  // console.log(
  //   imgBuffer.crop({
  //     x: 0, // start
  //     y: 0,
  //     width: 100,
  //     height: 100,
  //   })
  // );

  // const imgDataUrl = electron.nativeImage.createFromDataURL(
  //   "data:image/png;base64,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Wg5U/AalspCUvqnXW84+Dz9XlmlJJW9SQGJtRjPXbtjnZNigrAjIfKA01JOMAliyOsCxMK02KEf8CFQtBaAt+aN0nS8MtPKpp56aPHky0Pr06dOJ33fYYYeddtqJCcb+/fublZ542cxbMjLPPvvszJkz33nnHWJkxm2XXXbp0aPHcccdp/O68am+vmmb2dMWNfDtt99ecMEFN954o83FV3nVIzn+9NNPH3bYYXl0I/Cc9A1KikZWDa655pp8uieccMLHH39sH2eUPvvsM77tK664om/fvrfccsuWW25Z1b0cqqUA5JiHnyELa45iQBOYGHT88cf/7ne/A8WUcCdlN9BAgwcPvu+++4yXlUc3cB/9Z1bV4Nlnn33bbbfxu3v37u+9955mEqUZKOO5DVdeeSVSaGLQI488wkCBepaLXT7I1BHDrwpJnjp1KgLKG+Xg8uXLP//8c34cccQRe++99+LFi19//fW//OUvevmYMWMwcB988IE+2gqP4dPmWmuthejbuX8QJw8YMGCzzTabNWuWfGbGS9DG8/vFL37B0J155pm2r1k0ARCqG4YfhyUC8dprr+2///74nXz0PEzHjh0feuih/fbbD31mS+Fdd911/vnny79YOryud999VyYe03QjkArVIH9xhBwBPeWUU4YPH45BF03JOIwePZrv9pJLLsHiyyTcOeecQ0R13nnnZdWNPFimsHlPKqCTJk1CQE3FozrwwAPfeOONPffcc7lHej7vgLGeMmWKHkFMe/XqpZ7MikoioBdeeKEtoDjld99994Ybbkh8iULSKWK+2z/84Q847go48lXfc889pthU0Dx8yBZQIXE0jVdYwZ/QhDhuscUWtpjiOxLvy5mJexiB4SdrsByO4VfbIISJJ44U71ZIosbvv/8eOxN4FR/zb37zG/13yJAhKqbFEYBmiwqK4eODvv32246APvDAA0gMbyXsKlg9e/bEoim88uGHH3br1g2jv+Jh+MYT0HPPPdfRoAcddBCIvR/Db1fZxwfW5Zdfzghj64WLmH7zzTfDhg1DKxdwpqbJpkBYtfYp30TxBEl77LGHcocOHXrvvfeCPZmWFNggThhiqufgISDrttGP2UMnWrLPyeSRhbgLcKY/Mmu1QV4kltrRoH369GGUmoJWJbRruVwOibz55pvlN8EoTd1+++12AG3qJABNxc/DR0Cx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"
  // );
  // console.log(imgDataUrl);

  // fs.readFile("./icon.png", (err, file) => {
  //   if (err) return console.log(err);
  //   const img = electron.nativeImage.createFromBuffer(file);
  //   console.log(img);
  // });

  // let c = 0.01;
  // setInterval(() => {
  //    c += 0.01;
  //    mainWindow.setProgressBar(c);
  // }, 10);
  // mainWindow.setProgressBar(-1);
  // mainWindow.setProgressBar(2);

  // mainWindow.flashFrame(true);
  // mainWindow.flashFrame(false);

  createTray(mainWindow);

  // mainWindow.setOverlayIcon(
  //   electron.nativeImage.createFromPath("./icon.png"),
  //   "test"
  // );
};

electron.app.on("ready", async () => {
  main();

  // console.log(electron.nativeTheme.shouldUseDarkColors);
  // electron.nativeTheme.on("updated", () => {
  //   console.log("change theme");
  // });
  // console.log(electron.nativeTheme.shouldUseHighContrastColors);
  // console.log(electron.nativeTheme.shouldUseInvertedColorScheme); // برعکس کننده رنگ برای افراد نابینا

  // const products = await Product.findAll();
  // console.log(products);

  // getSms("10");

  // const notif = new electron.Notification({
  //   title: "title",
  //   body: "body",
  // timeoutType: "never",
  // });
  // notif.silent = true;

  // notif.on("click", () => {
  //   console.log("click");
  // });
  // notif.on("show", () => {
  //   console.log("notif show");
  // });
  // notif.on("close", () => {
  //   console.log("close");
  // });

  // setTimeout(() => {
  //   notif.show();
  // }, 1000);

  // const autoRun = new AutoLaunch({
  //   name: "market_manager",
  //   path: electron.app.getPath("exe"),
  // });
  // autoRun.enable();
  //autoRun.disable();

  // control + q

  // electron.globalShortcut.register("CommandOrControl+Q", () => {
  //   electron.app.quit();
  // });

  // if (electron.globalShortcut.isRegistered("CommandOrControl+Q")) {
  //   electron.globalShortcut.unregister("CommandOrControl+Q");
  // }

  // electron.globalShortcut.unregisterAll();

  // electron.globalShortcut.register("CommandOrControl+X", () => {
  //   new electron.Notification({
  //     title: "CommandOrControl+X",
  //     silent: true,
  //   }).show();
  // });

  // electron.globalShortcut.registerAll(["X", "C", "Z", "Q"], () => {
  //   electron.app.quit();
  // });

  // console.log("status", electron.net.online);
  // console.log("status", electron.net.isOnline());
  // electron.net
  //   .fetch("https://google.com")
  //   .then((data) => {
  //     // console.log(data.status);
  //     // console.log(data.body);
  //     // console.log(data.type);
  //     console.log(data.redirected);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // const request = electron.net.request("http://google.com");
  // request.on("response", (response) => {
  //   response.on("data", (data) => {
  //     // console.log(response.headers);
  //     // console.log(response.httpVersion);
  //     // console.log(response.statusCode);
  //     // console.log(response.statusMessage);
  //     // console.log(data.toString());
  //     console.log("data");
  //   });
  //   response.on("error", () => {
  //     console.log("err");
  //   });
  // });

  // request.setHeader("content-type", "json")
  // request.on("finish", () => {
  //   console.log("finish");
  // });
  // request.on("error", () => {
  //   console.log("err");
  // });
  // request.end();
});

// handel
require("./handel");

function createTray(mainWindow) {
  // const image = "./icon.png";
  // const image = electron.nativeImage.createFromPath("./icon.png");
  // const appTray = new electron.Tray(image);
  // appTray.setContextMenu(
  //   new electron.Menu.buildFromTemplate([
  //     {
  //       label: "nodejs",
  //       click: () => console.log("nodejs"),
  //       submenu: [{ label: "express" }, { label: "nestjs" }],
  //     },
  //     { label: "quit", role: "quit" },
  //   ])
  // );
  // appTray.on("click", (e) => {
  //   if (e.shiftKey) {
  //     electron.app.quit();
  //   } else {
  //     mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  //   }
  // });
  // console.log(appTray.listenerCount("click"));
  // appTray.on("right-click", () => {
  //   console.log("rc");
  // });
  // appTray.on("double-click", () => {
  //   electron.app.quit();
  // });
  // appTray.on("mouse-move", (e) => {
  //   console.log(e);
  // });
  // console.log(appTray.eventNames());
  // appTray.displayBalloon({
  //   iconType: "warning",
  //   title: "info title",
  //   content: "displayBalloon",
  // });
  // setTimeout(() => {
  //   appTray.destroy();
  // }, 10_000);
}

electron.app.setUserTasks([
  {
    title: "open electron",
    description: "description test",
    iconIndex: 0,
    iconPath: process.execPath,
    program: process.execPath,
  },
  {
    title: "open electron tow",
    description: "description test",
    iconIndex: 0,
    iconPath: process.execPath,
    program: process.execPath,
  },
]);

// shell
// electron.shell.beep();
// electron.shell.openExternal("http://google.com");
// electron.shell.openPath(
//   path.join(electron.app.getPath("desktop"), "trash.txt")
// ); // trash.txt
// electron.shell.showItemInFolder(electron.app.getAppPath());
// electron.shell.trashItem(
//   path.join(electron.app.getPath("desktop"), "trash.txt")
// );

// electron.powerMonitor.on("suspend", () => {
//   console.log("suspend");
// });
// electron.powerMonitor.on("resume", () => {
//   console.log("resume");
// });
// electron.powerMonitor.on("lock-screen", () => {
//   console.log("lock");
// });
// electron.powerMonitor.on("unlock-screen", () => {
//   console.log("unlock");
// });
// electron.powerMonitor.on("on-ac", () => {
//   console.log("on-ac");
// });
// electron.powerMonitor.on("on-battery", () => {
//   console.log("on-battery");
// });
// electron.powerMonitor.on("shutdown", () => {
//   console.log("shutdown");
// });
// electron.powerMonitor.on("speed-limit-change", (d) => {
//   console.log(d);
// });

// setInterval(() => {
//   console.log(electron.powerMonitor.getSystemIdleTime()); // s
// }, 5_000);
// console.log(electron.powerMonitor.getSystemIdleState(10)); // s
// console.log(electron.powerMonitor.isOnBatteryPower());
// console.log(electron.powerMonitor.onBatteryPower);

db.sync()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
