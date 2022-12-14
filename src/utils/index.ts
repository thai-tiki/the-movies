function debounce<T extends Function>(cb: T, wait = 20) {
  let timeoutId: ReturnType<typeof setTimeout>;
  let callable = function (this: T, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, args), wait);
  };
  return <T>(<any>callable);
}

export { debounce };
