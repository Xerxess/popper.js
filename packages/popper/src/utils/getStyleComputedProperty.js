/**
 * Get CSS computed property of the given element //返回element 的属性集合，如果指定property,则返回指定属性
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
export default function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  const window = element.ownerDocument.defaultView;
  const css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}
