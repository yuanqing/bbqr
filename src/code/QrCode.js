const React = require('react')
const QrCodeReact = require('qrcode.react')

class QrCode extends React.Component {
  render () {
    const { level, value, size } = this.props
    return (
      <div className='Code'>
        <QrCodeReact
          className='Code__svg'
          level={level}
          value={value}
          size={parseFloat(size)}
          renderAs='svg'
        />
        <div className='Code__value'>{value}</div>
      </div>
    )
  }
}

module.exports = QrCode
