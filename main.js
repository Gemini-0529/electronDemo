const { app, BrowserWindow, ipcMain } = require('electron')
// 自定义菜单
const customerMenu = require('./src/js/customerMenu')
// 右击菜单
const rightClickMenu = require('./src/js/rightClickMenu')
// 新版electron渲染进程想调用BrowserWindow主进程新建窗体，废弃了remote
const remote = require('@electron/remote/main')
// 去掉控制台的安全策略警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

remote.initialize()

const createWindow = () => {
  const mainWin = new BrowserWindow({
    minWidth: 1000,
    minHeight: 800,
    // maxWidth: 1920,
    // maxHeight: 1080,
    show: false,// 避免白屏（先创建窗体，再加载文件，容易白屏）
    resizable: true,// 能否改变窗体大小
    icon: './public/favicon.ico',
    title: 'Electon Demo',
    frame: true,
    webPreferences: {
      nodeIntegration: true, // 允许js代码访问node环境
      contextIsolation: false,
    }
  })
  // 创建自定义菜单栏
  customerMenu()

  // 允许渲染进程调用主进程方法
  remote.enable(mainWin.webContents)
  mainWin.loadFile('./src/view/index.html')
  // 准备就绪再展示窗体
  mainWin.on('ready-to-show', () => {
    mainWin.show()
  })


  mainWin.on('close', () => {
    console.log('window is closeing...');
  })

}

app.whenReady().then(()=>{
  createWindow()
})

// 监听鼠标右击，弹出菜单
ipcMain.on('contextMenu', (e) => {
  rightClickMenu().popup(BrowserWindow.fromWebContents(e.sender))
})




app.on('window-all-closed', () => {
  console.log('all window is closed.');
  app.quit()
})