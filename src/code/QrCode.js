const React = require('react')
const QrCodeReact = require('qrcode.react')

class QrCode extends React.Component {
  render () {
    const { qrCodeLevel, qrCodeSize, value } = this.props
    return (
      <div className='QrCode'>
        <QrCodeReact
          bgColor='transparent'
          className='QrCode__svg'
          level={qrCodeLevel}
          renderAs='svg'
          size={parseFloat(qrCodeSize)}
          value={value}
        />
        <div className='QrCode__value'>{value}</div>
      </div>
    )
  }
}

module.exports = QrCode
