const electron = require("electron");

exports.getSms = (count) => {
  new electron.Notification({
    title: "app ready",
    body: `sms: ${count}`,
  }).show();
};
