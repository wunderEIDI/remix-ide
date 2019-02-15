var yo = require('yo-yo')
var remixLib = require('remix-lib')

var tooltip = require('../ui/tooltip')
var copyToClipboard = require('../ui/copy-to-clipboard')
var styleGuide = require('../ui/styles-guide/theme-chooser')
var Storage = remixLib.Storage
var EventManager = require('../../lib/events')

var css = require('./styles/settings-tab-styles')

class SettingsTab {

  constructor (config, editor) {
    this.config = config
    this.editor = editor
    this.event = new EventManager()
    this.initTheme()
  }

  initTheme () {
    const themeStorage = new Storage('style:')
    this.currentTheme = themeStorage.get('theme') || 'light'
  }

  profile () {
    return {
      name: 'settings',
      methods: [],
      events: [],
      icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMTUyIDg5NnEwLTEwNi03NS0xODF0LTE4MS03NS0xODEgNzUtNzUgMTgxIDc1IDE4MSAxODEgNzUgMTgxLTc1IDc1LTE4MXptNTEyLTEwOXYyMjJxMCAxMi04IDIzdC0yMCAxM2wtMTg1IDI4cS0xOSA1NC0zOSA5MSAzNSA1MCAxMDcgMTM4IDEwIDEyIDEwIDI1dC05IDIzcS0yNyAzNy05OSAxMDh0LTk0IDcxcS0xMiAwLTI2LTlsLTEzOC0xMDhxLTQ0IDIzLTkxIDM4LTE2IDEzNi0yOSAxODYtNyAyOC0zNiAyOGgtMjIycS0xNCAwLTI0LjUtOC41dC0xMS41LTIxLjVsLTI4LTE4NHEtNDktMTYtOTAtMzdsLTE0MSAxMDdxLTEwIDktMjUgOS0xNCAwLTI1LTExLTEyNi0xMTQtMTY1LTE2OC03LTEwLTctMjMgMC0xMiA4LTIzIDE1LTIxIDUxLTY2LjV0NTQtNzAuNXEtMjctNTAtNDEtOTlsLTE4My0yN3EtMTMtMi0yMS0xMi41dC04LTIzLjV2LTIyMnEwLTEyIDgtMjN0MTktMTNsMTg2LTI4cTE0LTQ2IDM5LTkyLTQwLTU3LTEwNy0xMzgtMTAtMTItMTAtMjQgMC0xMCA5LTIzIDI2LTM2IDk4LjUtMTA3LjV0OTQuNS03MS41cTEzIDAgMjYgMTBsMTM4IDEwN3E0NC0yMyA5MS0zOCAxNi0xMzYgMjktMTg2IDctMjggMzYtMjhoMjIycTE0IDAgMjQuNSA4LjV0MTEuNSAyMS41bDI4IDE4NHE0OSAxNiA5MCAzN2wxNDItMTA3cTktOSAyNC05IDEzIDAgMjUgMTAgMTI5IDExOSAxNjUgMTcwIDcgOCA3IDIyIDAgMTItOCAyMy0xNSAyMS01MSA2Ni41dC01NCA3MC41cTI2IDUwIDQxIDk4bDE4MyAyOHExMyAyIDIxIDEyLjV0OCAyMy41eiIvPjwvc3ZnPg==',
      description: ' - ',
      kind: 'settings'
    }
  }

  toggleGenerateContractMetadata () {
    this.config.set('settings/generate-contract-metadata', !this.config.get('settings/generate-contract-metadata'))
  }

  toggleAlwaysUseVM () {
    this.config.set('settings/always-use-vm', !this.config.get('settings/always-use-vm'))
  }

  switchTheme (themeName) {
    styleGuide.switchTheme(themeName)
    window.location.reload()
  }

  togglePersonal () {
    this.config.set('settings/personal-mode', !this.config.get('settings/personal-mode'))
  }

  themeSwitcherUI () {
    const themes = {}
    themes.light = yo`<input onchange=${() => { this.switchTheme('light') }} class="${css.col1}" name="theme" id="themeLight" type="radio">`
    themes.dark = yo`<input onchange=${() => { this.switchTheme('dark') }} class="${css.col1}" name="theme" id="themeDark" type="radio">`
    themes.clean = yo`<input onchange=${() => { this.switchTheme('clean') }} class="${css.col1}" name="theme" id="themeClean" type="radio">`
    themes[this.currentTheme].setAttribute('checked', 'checked')

    const themeSwitcher = yo`
      <div class="${css.info}">
        <div class=${css.title}>Themes</div>
        <div class=${css.attention}>
          <i title="Select the theme" class="${css.icon} fa fa-exclamation-triangle" aria-hidden="true"></i>
          <span>Selecting a theme will trigger a page reload</span>
        </div>
        <div class="${css.crow}">
          ${themes.light}
          <label for="themeLight">Light Theme</label>
        </div>
        <div class="${css.crow}">
          ${themes.dark}
          <label for="themeDark">Dark Theme</label>
        </div>
        <div class="${css.crow}">
          ${themes.clean}
          <label for="themeClean">Clean Theme</label>
        </div>
      </div>`

    return themeSwitcher
  }

  gistTokenUI () {
    const gistAccessToken = yo`<input id="gistaccesstoken" type="password">`

    const token = this.config.get('settings/gist-access-token')
    if (token) gistAccessToken.value = token

    const gistAddToken = yo`<input class="${css.savegisttoken}" id="savegisttoken" onclick=${() => { this.config.set('settings/gist-access-token', gistAccessToken.value); tooltip('Access token saved') }} value="Save" type="button">`
    const gistRemoveToken = yo`<input id="removegisttoken" onclick=${() => { gistAccessToken.value = ''; this.config.set('settings/gist-access-token', ''); tooltip('Access token removed') }} value="Remove" type="button">`
    const gistToken = yo`<div class="${css.checkboxText}">${gistAccessToken}${copyToClipboard(() => this.config.get('settings/gist-access-token'))}${gistAddToken}${gistRemoveToken}</div>`

    const gistTokenEl = yo`
      <div class="${css.info}">
        <div class=${css.title}>Gist Access Token</div>
        <div class="${css.crowNoFlex}">Manage the access token used to publish to Gist and retrieve Github contents.</div>
        <div class="${css.crowNoFlex}">Go to github token page (link below) to create a new token and save it in Remix. Make sure this token has only 'create gist' permission.</div>
        <div class="${css.crowNoFlex}"><a target="_blank" href="https://github.com/settings/tokens">https://github.com/settings/tokens</a></div>
        <div class="${css.crowNoFlex}">${gistToken}</div>
      </div>`

    return gistTokenEl
  }

  generalSettingsUI () {
    const optionVM = yo`<input onchange=${this.toggleAlwaysUseVM.bind(this)} id="alwaysUseVM" type="checkbox">`
    if (this.config.get('settings/always-use-vm')) optionVM.setAttribute('checked', '')

    const personal = yo`<input onchange=${this.togglePersonal.bind(this)} id="personal" type="checkbox">`
    if (this.config.get('settings/personal-mode')) personal.setAttribute('checked', '')

    const warnText = `Transaction sent over Web3 will use the web3.personal API - be sure the endpoint is opened before enabling it.
    This mode allows to provide the passphrase in the Remix interface without having to unlock the account.
    Although this is very convenient, you should completely trust the backend you are connected to (Geth, Parity, ...).
    It is not recommended (and also most likely not relevant) to use this mode with an injected provider (Mist, Metamask, ...) or with JavaScript VM.
    Remix never persist any passphrase.`.split('\n').map(s => s.trim()).join(' ')

    const warnPersonalMode = yo`<i title=${warnText} class="${css.icon} fa fa-exclamation-triangle" aria-hidden="true"></i>`
    const generateContractMetadata = yo`<input onchange=${this.toggleGenerateContractMetadata.bind(this)} id="generatecontractmetadata" type="checkbox">`

    if (this.config.get('settings/generate-contract-metadata')) generateContractMetadata.setAttribute('checked', '')

    const general = yo`
      <div class="${css.info}">
          <div class=${css.title}>General settings</div>
          <div class="${css.crow}">
            <div>${generateContractMetadata}</div>
            <span class="${css.checkboxText}">Generate contract metadata. Generate a JSON file in the contract folder. Allows to specify library addresses the contract depends on. If nothing is specified, Remix deploys libraries automatically.</span>
          </div>
          <div class="${css.crow}">
            <div>${optionVM}</div>
            <span class="${css.checkboxText}">Always use Ethereum VM at Load</span>
          </div>
          <div class="${css.crow}">
            <div><input id="editorWrap" type="checkbox" onchange=${function () { this.editor.resize(this.checked) }}></div>
            <span class="${css.checkboxText}">Text Wrap</span>
          </div>
          <div class="${css.crow}">
            <div>${personal}></div>
            <span class="${css.checkboxText}">Enable Personal Mode ${warnPersonalMode}></span>
          </div>
      </div>
      `

    return general
  }

  render () {
    if (this.view) return this.view

    this.view = yo`
      <div class="${css.settingsTabView}" id="settingsView">
        ${this.generalSettingsUI()}
        ${this.gistTokenUI()}
        ${this.themeSwitcherUI()}
      </div>`

    return this.view
  }

}

module.exports = SettingsTab
