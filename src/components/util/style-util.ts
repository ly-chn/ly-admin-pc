export class StyleUtil {
  static addUnit(value?: string | number, unit = 'px') {
    if (!value) return ''
    if (typeof value === 'number' || !Number.isNaN(value)) {
      return `${value}${unit}`
    }
    return value
  }
}
