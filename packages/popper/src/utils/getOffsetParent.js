// 返回给定元素的偏移的相对父级（即position:relative/absolute）

import getStyleComputedProperty from './getStyleComputedProperty';
import isIE from './isIE';
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
export default function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  const noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  let offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent


  // https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode
  // NonDocumentTypeChildNode.nextElementSibling() 返回Element此父节点子列表中此节点的紧前面，或者此节点之前的列表中null没有Element该节点。
  // .nextSibling() .nextElementSibling() 不同之处在可以获取跳过任何空白节点，其他元素间文本或注释的下一个元素。

  //这个循环可以处理style.display 为 "none"时无法正确查找的问题，解决很巧妙
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  const nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (
    ['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&
    getStyleComputedProperty(offsetParent, 'position') === 'static'
  ) {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}
