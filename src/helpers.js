/* eslint-disable prefer-rest-params */
export default function debounce(fn, delay) {
  let timeoutID = null;
  // eslint-disable-next-line func-names
  return function () {
    clearTimeout(timeoutID);
    const args = arguments;
    const that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
}
