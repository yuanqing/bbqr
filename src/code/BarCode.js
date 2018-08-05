const React = require('react')
const jsBarCode = require('jsbarcode')

class BarCode extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isValid: true
    }
    this.update = this.update.bind(this)
  }
  componentDidMount () {
    this.update()
  }
  componentDidUpdate () {
    this.update()
  }
  static getDerivedStateFromProps (props, state) {
    if (
      props.barCodeFormat !== state.barCodeFormat ||
      props.barCodeHeight !== state.barCodeHeight ||
      props.barCodeWidth !== state.barCodeWidth ||
      props.value !== state.value
    ) {
      return {
        barCodeFormat: props.barCodeFormat,
        barCodeHeight: props.barCodeHeight,
        barCodeWidth: props.barCodeWidth,
        isValid: true,
        value: props.value
      }
    }
    return null
  }
  update () {
    if (!this.state.isValid) {
      return
    }
    const { barCodeFormat, barCodeHeight, barCodeWidth, value } = this.props
    try {
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
      this.setState({ isValid: false })
    }
  }
  render () {
    if (this.state.isValid) {
      return (
        <div className='BarCode'>
          <svg className='BarCode__svg' ref='svg' />
        </div>
      )
    }
    const { barCodeHeight, value } = this.props
    const height = parseFloat(barCodeHeight)
    return (
      <div className='BarCode BarCode--invalid'>
        <div className='BarCode__invalid' style={{ height }}>
          <div className='BarCode__invalidInner'>Invalid</div>
        </div>
        <div className='BarCode__invalidValue'>{value}</div>
      </div>
    )
  }
}

module.exports = BarCode
