//限制函数执行频率,必须第一次函数执行后才可再次执行

import isBrowser from './isBrowser';

const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
let timeoutDuration = 0;
for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

/**
 * 使用Promise 实现
 * @param {*} fn
 */
export function microtaskDebounce(fn) {
  let called = false
  return () => {
    if (called) {
      return
    }
    called = true
    window.Promise.resolve().then(() => {
      called = false
      fn()
    })
  }
}

/**
 * 使用setTimeout
 * @param {*} fn
 */
export function taskDebounce(fn) {
  let scheduled = false;
  return () => {
    if (!scheduled) {
      scheduled = true;
      setTimeout(() => {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

const supportsMicroTasks = isBrowser && window.Promise


/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
export default (supportsMicroTasks
  ? microtaskDebounce
  : taskDebounce);
