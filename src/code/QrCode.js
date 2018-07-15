const React = require('react')
const QrCodeReact = require('qrcode.react')

const SIZES = {
  extraSmall: 60,
  small: 100,
  medium: 120,
  large: 160,
  extraLarge: 200
}

class QrCode extends React.Component {
  render () {
    const {level, value, size} = this.props
    return (
      <div className='Code'>
        <QrCodeReact className='Code__svg' level={level} value={value} size={SIZES[size]} renderAs='svg' />
        <div className='Code__value'>{value}</div>
      </div>
    )
  }
}

module.exports = QrCode
