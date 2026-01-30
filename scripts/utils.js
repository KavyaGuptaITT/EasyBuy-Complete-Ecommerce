export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getQueryParam(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}
