/*
 * Helper to detect borders of a given element 根据styles 计算 一组相对border的宽度，即left+right / top+bottom
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

export default function getBordersSize(styles, axis) {
  const sideA = axis === 'x' ? 'Left' : 'Top';
  const sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return (
    parseFloat(styles[`border${sideA}Width`], 10) +
    parseFloat(styles[`border${sideB}Width`], 10)
  );
}
