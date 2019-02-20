var styleGuideLight = require('./style-guide')
var styleGuideDark = require('./styleGuideDark')
var styleGuideClean = require('./styleGuideClean')
var Storage = require('remix-lib').Storage

// Boostrap themes
// TODO : Put it somewhere else
const themes = {
  dark: 'https://bootstrap.themes.guide/darkster/theme.min.css',
  light: 'https://bootstrap.themes.guide/herbie/theme.min.css',
  clean: 'https://bootstrap.themes.guide/fresca/theme.min.css'
}
module.exports = {

  chooser: function () {
    const themeStorage = new Storage('style:')
    if (themeStorage.exists('theme')) {
      if (themeStorage.get('theme') === 'dark') {
        document.getElementById('theme-link').setAttribute('href', themes['dark'])
        return styleGuideDark()
      } else if (themeStorage.get('theme') === 'clean') {
        document.getElementById('theme-link').setAttribute('href', themes['clean'])
        return styleGuideClean()
      } else {
        document.getElementById('theme-link').setAttribute('href', themes['light'])
        return styleGuideLight()
      }
    } else {
      document.getElementById('theme-link').setAttribute('href', themes['light'])
      return styleGuideLight()
    }
  },

  switchTheme: function (theme) {
    const themeStorage = new Storage('style:')
    themeStorage.set('theme', theme)
    // Set Boostrap theme
    if (themes[theme]) {
      document.getElementById('theme-link').setAttribute('href', themes[theme])
    }
    // if (theme === 'dark') {
    //   return styleGuideDark()
    // } else if (theme === 'light') {
    //   return styleGuideLight()
    // } else if (theme === 'clean') {
    //   return styleGuideClean()
    // } else {
    //   return styleGuideLight()
    // }
  }
}
