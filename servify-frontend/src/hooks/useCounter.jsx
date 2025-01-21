import { useState, useEffect } from "react";

const useCounter = (end, start, duration) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, start, duration]);

  return count;
};

export default useCounter;
