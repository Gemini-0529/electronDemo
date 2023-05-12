const { Menu } = require("electron");
const platform = process.platform; // win32
// macos 和 windows 对应的方法不一样，需要区分
module.exports = function () {
  const menuTemp = [
    {
      label: "文件",
      submenu: [
        { label: "新建文件" },
        { label: "打开最近的文件" },
        { type: "separator" },
        {
          label: "退出",
          role: 'quit'
        },
      ],
    },
    {
      label: "编辑",
      submenu: [
        {
          label: "重启",
          role: "reload",
        },
        {
          label: "切换控制台",
          role: "toggleDevTools",
        },
      ],
    },
    {
      label: "帮助",
    },
  ];
  // 生成菜单项
  const menu = Menu.buildFromTemplate(menuTemp);
  // 添加到应用中
  Menu.setApplicationMenu(menu);
};
