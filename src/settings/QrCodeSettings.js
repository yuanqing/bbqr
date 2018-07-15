const React = require('react')

class SettingsQrCode extends React.Component {
  constructor (props) {
    super(props)
    this.handleLevelChange = this.createChangeHandler.call(this, 'level')
    this.handleSizeChange = this.createChangeHandler.call(this, 'size')
  }

  createChangeHandler (key) {
    const {handleChange} = this.props
    return function (event) {
      const value = event.target.value
      handleChange({ [key]: value })
    }
  }

  render () {
    const { level, size } = this.props
    return (
      <div className='Settings'>
        <div className='SelectBox'>
          <select
            className='SelectBox__selectBox'
            onChange={this.handleLevelChange}
            value={level}
          >
            <option value='L'>Level — L</option>
            <option value='M'>Level — M</option>
            <option value='Q'>Level — Q</option>
            <option value='H'>Level — H</option>
          </select>
        </div>
        <div className='SelectBox'>
          <select
            className='SelectBox__selectBox'
            onChange={this.handleSizeChange}
            value={size}
          >
            <option value='extraSmall'>Size — XS</option>
            <option value='small'>Size — S</option>
            <option value='medium'>Size — M</option>
            <option value='large'>Size — L</option>
            <option value='extraLarge'>Size — XL</option>
          </select>
        </div>
      </div>
    )
  }
}

module.exports = SettingsQrCode
