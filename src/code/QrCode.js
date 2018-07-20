const React = require('react')
const QrCodeReact = require('qrcode.react')

class QrCode extends React.Component {
  render () {
    const { value, qrCodeLevel, qrCodeSize } = this.props
    return (
      <div className='Code'>
        <QrCodeReact
          className='Code__svg'
          level={qrCodeLevel}
          value={value}
          size={parseFloat(qrCodeSize)}
          renderAs='svg'
        />
        <div className='Code__value'>{value}</div>
      </div>
    )
  }
}

module.exports = QrCode
