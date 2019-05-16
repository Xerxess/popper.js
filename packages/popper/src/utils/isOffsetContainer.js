//判断当前元素相对的偏移父元素，如果不是body的话

import getOffsetParent from './getOffsetParent';

export default function isOffsetContainer(element) {
  const { nodeName } = element;
  if (nodeName === 'BODY') {
    return false;
  }
  return (
    nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element
  );
}
