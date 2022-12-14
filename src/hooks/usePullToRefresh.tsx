import { useEffect, useState } from "react";

const usePullToRefresh = () => {
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState(0);
  const [pulled, setPulled] = useState(true);

  const initLoading = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const pullStart = (e) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
    setPulled(false);
  };

  const pull = (e) => {
    const touch = e.targetTouches[0];
    const { clientY } = touch;
    let pullLength = startPoint < clientY ? Math.abs(clientY - startPoint) : 0;
    setPullChange(pullLength);
  };

  const endPull = () => {
    setPulled(true);
  };

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  }, []);

  useEffect(() => {
    if (pulled && pullChange > 220) {
      initLoading();
      setStartPoint(0);
      setPullChange(0);
    }
  }, [pulled, pullChange]);

  const createPullElement = () => (
    <div
      className="w-fit -mt-10 m-auto"
      style={{ marginTop: pullChange / 3.118 || "" }}
    >
      <div className="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          style={{ transform: `rotate(${pullChange}deg)` }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </div>
  );

  return { createPullElement };
};

export { usePullToRefresh };
