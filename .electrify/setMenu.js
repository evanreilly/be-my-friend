const { app, Menu, shell, dialog } = require('electron')

const setMenu = function(win) {
  const template = [{
    label: 'Be My Friend',
    submenu: [
      {
        label: 'About This Program',
        click: () => shell.openExternal('https://valiafetisov.com/my-little-prism')
      },
      {
        type: 'separator'
      },
      {
        label: 'Export JSON...',
        click: function() {
          dialog.showSaveDialog({
            title: 'Save as',
            defaultPath: '~/Downloads/be-my-friend_backup.json'
          }, function(filepath) {
            if (filepath === undefined) return
            console.log('Export JSON: filepath', filepath)
            win.webContents.executeJavaScript('Meteor.call("exportJSON", "' + filepath + '")')
          })
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: app.quit
      }
    ]
  }]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = { setMenu }
