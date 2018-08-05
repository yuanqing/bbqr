const React = require('react')

class SettingsQrCode extends React.Component {
  constructor (props) {
    super(props)
    const { createInputChangeHandler } = this.props
    this.handleLevelChange = createInputChangeHandler('qrCodeLevel')
    this.handleSizeChange = createInputChangeHandler('qrCodeSize')
  }

  render () {
    const { qrCodeLevel, qrCodeSize } = this.props
    return (
      <div className='Settings'>
        <div className='SelectBox'>
          <select
            className='SelectBox__selectBox'
            onChange={this.handleLevelChange}
            value={qrCodeLevel}
          >
            <option value='l'>Level — L</option>
            <option value='m'>Level — M</option>
            <option value='q'>Level — Q</option>
            <option value='h'>Level — H</option>
          </select>
        </div>
        <div className='TextBox'>
          <input
            type='text'
            className='TextBox__textBox'
            onChange={this.handleSizeChange}
            value={qrCodeSize}
          />
        </div>
      </div>
    )
  }
}

module.exports = SettingsQrCode
