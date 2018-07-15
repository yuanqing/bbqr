const React = require('react')

class SettingsBarCode extends React.Component {
  constructor (props) {
    super(props)
    this.handleFormatChange = this.createChangeHandler.call(this, 'format')
    this.handleWidthChange = this.createChangeHandler.call(this, 'width')
    this.handleHeightChange = this.createChangeHandler.call(this, 'height')
  }

  createChangeHandler (key) {
    const { handleChange } = this.props
    return function (event) {
      const value = event.target.value
      handleChange({ [key]: value })
    }
  }

  render () {
    const { format, width, height } = this.props
    return (
      <div className='Settings'>
        <div className='SelectBox'>
          <select
            className='SelectBox__selectBox'
            onChange={this.handleFormatChange}
            value={format}
          >
            <option value='CODE128'>Format — CODE128</option>
            <option value='CODE39'>Format — CODE39</option>
            <option value='EAN13'>Format — EAN-13</option>
            <option value='EAN8'>Format — EAN-8</option>
            <option value='EAN5'>Format — EAN-5</option>
            <option value='EAN2'>Format — EAN-2</option>
            <option value='UPC'>Format — UPC</option>
            <option value='ITF14'>Format — ITF-14</option>
            <option value='MSI'>Format — MSI</option>
          </select>
        </div>
        <div className='SelectBox'>
          <select
            className='SelectBox__selectBox'
            onChange={this.handleWidthChange}
            value={width}
          >
            <option value='extraSmall'>Width — XS</option>
            <option value='small'>Width — S</option>
            <option value='medium'>Width — M</option>
            <option value='large'>Width — L</option>
            <option value='extraLarge'>Width — XL</option>
          </select>
        </div>
        <div className='SelectBox'>
          <select
            className='SelectBox__selectBox'
            onChange={this.handleHeightChange}
            value={height}
          >
            <option value='extraSmall'>Height — XS</option>
            <option value='small'>Height — S</option>
            <option value='medium'>Height — M</option>
            <option value='large'>Height — L</option>
            <option value='extraLarge'>Height — XL</option>
          </select>
        </div>
      </div>
    )
  }
}

module.exports = SettingsBarCode
