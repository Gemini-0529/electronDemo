const { Menu } = require('electron')

module.exports = () => {
  const menuTemp = [
    { 
      label: '重新加载',
    },
    { label: '截屏'},
    { type: 'separator'},
    { label: '查看源代码'},
    { 
      label: '审查元素'
    },
  ]
  return Menu.buildFromTemplate(menuTemp)
}