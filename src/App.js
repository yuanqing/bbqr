const lodashChunk = require('lodash.chunk')
const React = require('react')

const settingsComponents = {
  barCode: require('./settings/BarCodeSettings'),
  qrCode: require('./settings/QrCodeSettings')
}
const codeComponents = {
  barCode: require('./code/BarCode'),
  qrCode: require('./code/QrCode')
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      codeType: 'barCode',
      settings: {
        barCode: {
          format: 'code128',
          width: 'medium',
          height: 'medium'
        },
        qrCode: {
          level: 'L',
          size: 'medium'
        }
      },
      textSize: 'medium',
      columnCount: '2',
      data: []
    }
    this.handleCodeTypeChange = this.createChangeHandler.call(this, 'codeType')
    this.handleCodeTypeSettingsChange = this.handleCodeTypeSettingsChange.bind(
      this
    )
    this.handleTextSizeChange = this.createChangeHandler.call(this, 'textSize')
    this.handleColumnCountChange = this.createChangeHandler.call(
      this,
      'columnCount'
    )
    this.handleDataChange = this.handleDataChange.bind(this)
  }

  createChangeHandler (key) {
    const self = this
    return function (event) {
      const value = event.target.value
      self.setState({ [key]: value })
    }
  }

  handleCodeTypeSettingsChange (newSettings) {
    const { codeType, settings } = this.state
    this.setState({
      settings: {
        [codeType]: {
          ...settings[codeType],
          ...newSettings
        }
      }
    })
  }

  handleDataChange (event) {
    const string = event.target.value
    if (string === '') {
      this.setState({ data: [] })
      return
    }
    const data = string.split('\n').filter(function (value) {
      return value.length > 0
    })
    this.setState({
      data
    })
  }

  render () {
    const { codeType, settings, textSize, columnCount, data } = this.state
    const Settings = settingsComponents[codeType]
    const Code = codeComponents[codeType]
    const codeTypeSettings = settings[codeType]
    const rows = lodashChunk(data || [], columnCount)
    return (
      <div className='App'>
        <div className='Panel'>
          <h1 className='Panel__header'>BBQR</h1>
          <div className='Panel__codeType Section'>
            <div className='RadioButtons'>
              <label
                htmlFor='barCode'
                className='RadioButtons__radioButtonItem'
              >
                <input
                  className='RadioButtons__radioButton'
                  type='radio'
                  name='codeType'
                  value='barCode'
                  id='barCode'
                  onChange={this.handleCodeTypeChange}
                  checked={codeType === 'barCode'}
                />
                <span className='RadioButtons__label'>Barcode</span>
              </label>
              <label htmlFor='qrCode' className='RadioButtons__radioButtonItem'>
                <input
                  className='RadioButtons__radioButton'
                  type='radio'
                  name='codeType'
                  value='qrCode'
                  id='qrCode'
                  onChange={this.handleCodeTypeChange}
                  checked={codeType === 'qrCode'}
                />
                <span className='RadioButtons__label'>QR code</span>
              </label>
            </div>
          </div>
          <div className='Panel__settings'>
            <Settings
              handleChange={this.handleCodeTypeSettingsChange}
              {...codeTypeSettings}
            />
            <div className='SelectBox'>
              <select
                className='SelectBox__selectBox'
                onChange={this.handleTextSizeChange}
                value={textSize}
              >
                <option value='extraSmall'>Text size — XS</option>
                <option value='small'>Text size — S</option>
                <option value='medium'>Text size — M</option>
                <option value='large'>Text size — L</option>
                <option value='extraLarge'>Text size — XL</option>
              </select>
            </div>
            <div className='SelectBox'>
              <select
                className='SelectBox__selectBox'
                onChange={this.handleColumnCountChange}
                value={columnCount}
              >
                <option value='1'>Columns — 1</option>
                <option value='2'>Columns — 2</option>
                <option value='3'>Columns — 3</option>
                <option value='4'>Columns — 4</option>
                <option value='5'>Columns — 5</option>
              </select>
            </div>
          </div>
          <div className='Panel__data'>
            <label htmlFor='data' className='TextArea Panel__dataTextArea'>
              <textarea
                name='data'
                className='TextArea__textArea'
                onChange={this.handleDataChange}
                placeholder='Enter data here…'
              />
            </label>
          </div>
        </div>
        {data.length > 0 && (
          <div className='Content'>
            <div className='Content__table'>
              {rows.map(function (codes, index) {
                return (
                  <div className='Content__row' key={index}>
                    {codes.map(function (value, index) {
                      return (
                        <div
                          className={`Content__cell Content__cell--${textSize}`}
                          key={index}
                        >
                          <Code
                            value={value}
                            key={index}
                            {...codeTypeSettings}
                          />
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}

module.exports = App
