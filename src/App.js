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

function getLocationHash() {
  const hash = window.location.hash
  return hash[0] === '#' ? hash.substring(1) : hash
}

function deserialize (string) {
  if (string === '') {
    return {}
  }
  return string.split('&').reduce(function(result, item) {
    const split = item.split('=')
    result[split[0]] = split[1]
    return result
  }, {})
}

function serialize (data) {
  return Object.keys(data).reduce(function(result, key) {
    result.push(`${key}=${data[key]}`)
    return result
  }, []).join('&')
}

const defaultState = {
  activeCodeType: 'barCode',
  barCodeFormat: 'code128',
  barCodeWidth: '2',
  barCodeHeight: '40',
  qrCodeLevel: 'L',
  qrCodeSize: '100',
  textSize: 'medium',
  columnCount: '2',
  data: []
}

class App extends React.Component {
  constructor (props) {
    super(props)
    const hash = getLocationHash()
    this.state = {
      ...defaultState,
      ...deserialize(hash)
    }
    this.createInputChangeHandler = this.createInputChangeHandler.bind(this)
    this.handleActiveCodeTypeChange = this.createInputChangeHandler(
      'activeCodeType'
    )
    this.handleTextSizeChange = this.createInputChangeHandler(
      'textSize'
    )
    this.handleColumnCountChange = this.createInputChangeHandler(
      'columnCount'
    )
    this.handleDataChange = this.handleDataChange.bind(this)
  }

  updateHash () {
    const {data, ...settings} = this.state
    window.location.hash = serialize(settings)
  }
  componentDidMount () {
    this.updateHash()
  }
  componentDidUpdate () {
    this.updateHash()
  }

  createInputChangeHandler (key) {
    const self = this
    return function (event) {
      const value = event.target.value
      self.setState({ [key]: value })
    }
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
    const {
      activeCodeType,
      barCodeFormat,
      barCodeWidth,
      barCodeHeight,
      qrCodeLevel,
      qrCodeSize,
      textSize,
      columnCount,
      data
    } = this.state
    const CodeComponent = codeComponents[activeCodeType]
    const SettingsComponent = settingsComponents[activeCodeType]
    const settings = {
      barCodeFormat,
      barCodeWidth,
      barCodeHeight,
      qrCodeLevel,
      qrCodeSize
    }
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
                  name='activeCodeType'
                  value='barCode'
                  id='barCode'
                  onChange={this.handleActiveCodeTypeChange}
                  checked={activeCodeType === 'barCode'}
                />
                <span className='RadioButtons__label'>Barcode</span>
              </label>
              <label htmlFor='qrCode' className='RadioButtons__radioButtonItem'>
                <input
                  className='RadioButtons__radioButton'
                  type='radio'
                  name='activeCodeType'
                  value='qrCode'
                  id='qrCode'
                  onChange={this.handleActiveCodeTypeChange}
                  checked={activeCodeType === 'qrCode'}
                />
                <span className='RadioButtons__label'>QR code</span>
              </label>
            </div>
          </div>
          <div className='Panel__settings'>
            <SettingsComponent
              createInputChangeHandler={this.createInputChangeHandler.bind(this)}
              {...settings}
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
                          <CodeComponent
                            value={value}
                            key={index}
                            {...settings}
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
