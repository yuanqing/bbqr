const React = require('react')

class SettingsBarCode extends React.Component {
  constructor (props) {
    super(props)
    const { createInputChangeHandler } = this.props
    this.handleFormatChange = createInputChangeHandler('barCodeFormat')
    this.handleWidthChange = createInputChangeHandler('barCodeWidth')
    this.handleHeightChange = createInputChangeHandler('barCodeHeight')
  }

  render () {
    const { barCodeFormat, barCodeWidth, barCodeHeight } = this.props
    return (
      <div className='Settings'>
        <div className='SelectBox'>
          <select
            className='SelectBox__selectBox'
            onChange={this.handleFormatChange}
            value={barCodeFormat}
          >
            <option value='CODE128'>Format — CODE128</option>
            <option value='CODE39'>Format — CODE39</option>
            <option value='EAN13'>Format — EAN13</option>
          </select>
        </div>
        <div className='TextBox'>
          <input
            type='input'
            className='TextBox__textBox'
            onChange={this.handleWidthChange}
            value={barCodeWidth}
          />
        </div>
        <div className='TextBox'>
          <input
            type='input'
            className='TextBox__textBox'
            onChange={this.handleHeightChange}
            value={barCodeHeight}
          />
        </div>
      </div>
    )
  }
}

module.exports = SettingsBarCode
