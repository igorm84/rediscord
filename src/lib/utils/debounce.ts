export default function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 500,
  ) {
    let timeoutID: NodeJS.Timeout | null;
    return (...args: Parameters<T>) => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  