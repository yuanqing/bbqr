const React = require('react')
const jsBarCode = require('jsbarcode')

const WIDTHS = {
  extraSmall: 1.2,
  small: 1.6,
  medium: 2,
  large: 3,
  extraLarge: 4
}
const HEIGHTS = {
  extraSmall: 15,
  small: 20,
  medium: 30,
  large: 40,
  extraLarge: 60
}

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
      const {value, format, width, height} = this.props
      jsBarCode(this.refs.svg, value, {
        displayValue: false,
        format: format,
        width: WIDTHS[width],
        height: HEIGHTS[height],
        margin: 0
      })
    } catch (error) {
      console.error(error)
    }
  }
  render () {
    const {value} = this.props
    return (
      <div className='Code'>
        <svg className='Code__svg' ref='svg' />
        <div className='Code__value'>{value}</div>
      </div>
    )
  }
}

module.exports = BarCode
