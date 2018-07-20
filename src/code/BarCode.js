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
    try {
      const { value, barCodeFormat, barCodeWidth, barCodeHeight } = this.props
      jsBarCode(this.refs.svg, value, {
        displayValue: false,
        format: barCodeFormat,
        width: parseFloat(barCodeWidth),
        height: parseFloat(barCodeHeight),
        margin: 0
      })
    } catch (error) {
      console.error(error)
    }
  }
  render () {
    const { value } = this.props
    return (
      <div className='Code'>
        <svg className='Code__svg' ref='svg' />
        <div className='Code__value'>{value}</div>
      </div>
    )
  }
}

module.exports = BarCode
