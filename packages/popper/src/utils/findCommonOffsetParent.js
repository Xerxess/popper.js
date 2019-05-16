
// 查找两个提供的节点共用的偏移父级

import isOffsetContainer from './isOffsetContainer';
import getRoot from './getRoot';
import getOffsetParent from './getOffsetParent';

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
export default function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  // element1 element2 不存在时 直接返回documentElement
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM 这里，我们确保将dom中第一个元素作为“start”给出
// compareDocumentPosition
// DOCUMENT_POSITION_DISCONNECTED	1 没有关系，两个节点不属于同一个文档。
// DOCUMENT_POSITION_PRECEDING	2 第一节点（P1）位于第二个节点后（P2）。
// DOCUMENT_POSITION_FOLLOWING	4 第一节点（P1）定位在第二节点（P2）前。
// DOCUMENT_POSITION_CONTAINS	8 第一节点（P1）位于第二节点内（P2）。
// DOCUMENT_POSITION_CONTAINED_BY	16 第二节点（P2）位于第一节点内（P1）。
// DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC	32 没有关系，或是两个节点是同一元素的两个属性。
  const order =
    element1.compareDocumentPosition(element2) &
    Node.DOCUMENT_POSITION_FOLLOWING;
  const start = order ? element1 : element2;
  const end = order ? element2 : element1;

  // Get common ancestor container
  // Range 接口表示可以包含节点和文本节点的部分的文档的片段。 https://developer.mozilla.org/en-US/docs/Web/API/Range
  const range = document.createRange(); //Document.createRange（）方法返回一个新的Range对象。
  range.setStart(start, 0);
  range.setEnd(end, 0);
  const { commonAncestorContainer } = range;

  // Both nodes are inside #document
  if (
    (element1 !== commonAncestorContainer &&
      element2 !== commonAncestorContainer) ||
    start.contains(end)
  ) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  const element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
