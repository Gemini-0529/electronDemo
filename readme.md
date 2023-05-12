#### 新建窗口

> new BrowserWindow(options)

```javascript
options: {
  minWidth: 800,
  minHeight: 600,
  // maxWidth: 1920,
  // maxHeight: 1080,
  show: false,// 避免白屏（先创建窗体，再加载文件，容易白屏）
  resizable: true,// 能否改变窗体大小
  icon: './public/favicon.ico',
  title: 'Electon Demo',
  frame: false, // 去掉自带的菜单
  webPreferences: {
    nodeIntegration: true, // 允许js代码访问node环境
    contextIsolation: false, //
  }
}
```

#### 渲染进程调用主进程

1. 引入 remote
2. 初始化
3. 允许调用
4. 调用主进程方法

```javascript
npm i @electron/remote -D

const remote = require('@electron/remote/main')
remote.initialize()
remote.enable(mainWin.webContents)



// 渲染进程中
const { getCurrentWindow } = require('@electron/remote');
// 调用主进程
// 获取当前窗口
let mainWin = getCurrentWindow()

// 销毁当前窗口
mainWin.destroy()


// 关闭当前窗口
mainWin.close()


// 当前是否全屏
mainWin.isMaximized()

// 最大化
mainWin.maximize()


// 是否最小化
mainWin.isMinimized()


// 最小化
mainWin.minimize()


// 恢复窗口大小
mainWin.restore()
```

#### 自定义菜单

前提：frame 一定为 true

1. label 菜单名称
2. submenu 子菜单
3. type 分割线等
4. click 点击事件
5. role electron内置菜单事件，跟click相互冲突
6. 需要区分当前系统，切换对应的方法 --process.platform

```javascript
const { Menu } = require("electron");
// 创建菜单模板
[
  { label: '一级菜单'
    submenu: [
      { label: '二级菜单'}
      { label: '二级菜单'}
      { type: 'separator'} // 分割线
      { 
        label: '二级菜单',
        click: async () => { // 菜单点击事件
          console.log('退出');
        }
      },
      {
        label: '重启',
        role: 'reload'
      },
    ]
  },
  { label: '一级菜单'}
]

 // 生成菜单项
  const menu = Menu.buildFromTemplate(menuTemp);
  // 添加到应用中
  Menu.setApplicationMenu(menu);
```
