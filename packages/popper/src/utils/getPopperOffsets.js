/**
 * 计算this.popper 的最终位置
 */
import getOuterSizes from './getOuterSizes';
import getOppositePlacement from './getOppositePlacement';

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
export default function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  const popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  const popperOffsets = {
    width: popperRect.width,
    height: popperRect.height,
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  const isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  const mainSide = isHoriz ? 'top' : 'left';
  const secondarySide = isHoriz ? 'left' : 'top';
  const measurement = isHoriz ? 'height' : 'width';
  const secondaryMeasurement = !isHoriz ? 'height' : 'width';

  // 根据 isHoriz还计算this.popper位置
  /**
   *
   * isHoriz=left|right
   * mainSide=top
   * secondarySide=left
   * measurement=height
   * secondaryMeasurement=width
   * popperOffsets['top']=referenceOffsets['top']+referenceOffsets['height']/2-popperRect['height'] 非常简单的计算公式，计算垂直方向中间位置
   * ------------------------------------------------------------------------------------
   *
   * isHoriz!=left|right
   * mainSide=left
   * secondarySide=top
   * measurement=width
   * secondaryMeasurement=height
   * popperOffsets['left']=referenceOffsets['left']+referenceOffsets['width']/2-popperRect['width'] 非常简单的计算公式，计算水平方向中间位置
   *
   */

  popperOffsets[mainSide] =
    referenceOffsets[mainSide] +
    referenceOffsets[measurement] / 2 -
    popperRect[measurement] / 2;

   /**
   *
   * placement='left'==secondarySide='left'
   * popperOffsets['left']=referenceOffsets['left'] - popperRect['width']; 计算left的距离
   * -----------------------------------------------------------------
   * placement='top'==secondarySide='top'
   * popperOffsets['top']=referenceOffsets['top'] - popperRect['height']; 计算top的距离
   */
  if (placement === secondarySide) {
    popperOffsets[secondarySide] =
      referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    /**
     *
     *
     * 当 placement=='right'时 popperOffsets['left']=referenceOffsets['right']
     *
     * 当 placement=='bottom'时 popperOffsets['top']=referenceOffsets['bottom']
     *
     */
    popperOffsets[secondarySide] =
      referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
