const { BrowserWindow, getCurrentWindow } = require('@electron/remote');
const { ipcRenderer } = require('electron')
const path = require('path')
// 获取当前窗口
let mainWin = getCurrentWindow()
window.addEventListener('DOMContentLoaded', ()=> {
  const addBtn = document.getElementById('btn')
  // js属于渲染进程，app是主进程
  addBtn.onclick = () => {
    let listWin = new BrowserWindow({
      width: 200,
      height: 200,
      modal: true,// 模态框
      parent: mainWin // 指定父级窗口，禁止点击主窗口事件
    })
    listWin.loadFile(path.join(__dirname, 'list.html'))
    listWin.on('close', () => {
      listWin = null
    })
  }
  // 监听窗口关闭
  window.onbeforeunload = function() {
    const tooltip = document.querySelector('.tooltip')
    tooltip.style.display = 'block'

    const cancel= document.querySelector('.footer .cancel')
    const close= document.querySelector('.footer .close')

    cancel.onclick = () => {
      tooltip.style.display = 'none'
    }
    // 销毁当前窗口，而不是close()，避免死循环
    close.onclick = () => {
      mainWin.destroy()
    }

    return false
  }
  function closeWin() {
    mainWin.close()
  }
  function fullWin() {
    // 先判断当前是否全屏
    if(!mainWin.isMaximized()) {
      mainWin.maximize()
    } else {
      // 复原
      mainWin.restore()
    }
  }
  function smallWin() {
    if(!mainWin.isMinimized()) {
      mainWin.minimize()
    }
  }
  // 最小化按钮
  const smallBtn = document.querySelector('.toolBar .icons')
  smallBtn.addEventListener('click', e => {
    if(e) {
      e.stopPropagation()
    }
    switch(e.target.className) {
      case 'close':
        closeWin()
        break;
      case 'small':
        smallWin()
        break;
      case 'fullScreen':
        fullWin()
        break;
    }
  })


  //   由渲染进程监听右击，发送事件，主进程监听，弹出菜单
  window.addEventListener('contextmenu', e => {
    e.preventDefault()
    ipcRenderer.send('contextMenu')
  })
})
