const csjs = require('csjs-inject')
const styleGuide = require('../../ui/styles-guide/theme-chooser')
const styles = styleGuide.chooser()

const css = csjs`
  .settingsTabView {
    padding: 2%;
  }
  .info {
    ${styles.rightPanel.settingsTab.box_SolidityVersionInfo};
    margin-bottom: 1em;
    word-break: break-word;
  }
  .title {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 1em;
  }
  .crow {
    display: flex;
    overflow: auto;
    clear: both;
    padding: .2em;
  }
  .checkboxText {
    font-weight: normal;
  }
  .crow label {
    cursor:pointer;
  }
  .crowNoFlex {
    overflow: auto;
    clear: both;
  }
  .attention {
    margin-bottom: 1em;
    padding: .5em;
    font-weight: bold;
  }
  .heading {
    margin-bottom: 0;
  }
  .explaination {
    margin-top: 3px;
    margin-bottom: 3px;
  }
  input {
    margin-right: 5px;
    cursor: pointer;
    width: inherit;
  }
  input[type=radio] {
    margin-top: 2px;
  }
  .pluginTextArea {
    font-family: unset;
  }
  .pluginLoad {
    vertical-align: top;
    ${styles.rightPanel.settingsTab.button_LoadPlugin};
    width: inherit;
    display: inline-block;
  }
  .initPlugin {
    vertical-align: top;
    ${styles.rightPanel.settingsTab.button_initPlugin};
    width: inherit;
    display: block;
    max-height: inherit;
    padding:7px;
  }

  .removePlugin {
    cursor: pointer;
  }
  i.warnIt {
    color: ${styles.appProperties.warningText_Color};
  }
  .icon {
    margin-right: .5em;
  }
  .savegisttoken {
    margin-left: 5px;
  }
  .aPlugin {
    display: inline-block;
    padding-left: 10px;
    padding-top: 4px;
    padding-bottom: 6px;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
  }
  .pluginLoad {
    vertical-align: top;
    max-height: inherit;
    margin: 2px;

  }
  .removePlugin{
    padding-left: 7px;
    padding-right: 7px;
    border-left: 2px solid ${styles.appProperties.primary_BackgroundColor};
    margin-left: 10px;
  }
`

module.exports = css
