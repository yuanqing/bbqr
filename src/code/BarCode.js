const React = require('react')
const jsBarCode = require('jsbarcode')

class BarCode extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }
  componentDidMount () {
    this.update()
  }
  componentDidUpdate () {
    this.update()
  }
  update () {
    this.refs.root.classList.remove('BarCode--invalid')
    try {
      const { barCodeFormat, barCodeHeight, barCodeWidth, value } = this.props
      jsBarCode(this.refs.svg, value, {
        displayValue: true,
        format: barCodeFormat,
        font: 'inherit',
        height: parseFloat(barCodeHeight),
        margin: 0,
        textMargin: 0,
        width: parseFloat(barCodeWidth)
      })
    } catch (error) {
      this.refs.root.classList.add('BarCode--invalid')
    }
  }
  render () {
    return (
      <div className='BarCode' ref='root'>
        <svg className='BarCode__svg' ref='svg' />
      </div>
    )
  }
}

module.exports = BarCode
