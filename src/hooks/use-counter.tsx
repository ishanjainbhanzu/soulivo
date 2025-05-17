import { useState, useEffect } from "react";

interface UseCounterProps {
  start: number;
  end: number;
  duration?: number;
  startCounting?: boolean;
}

export function useCounter({ 
  start, 
  end, 
  duration = 2000,
  startCounting = true
}: UseCounterProps) {
  const [displayValue, setDisplayValue] = useState(start);
  const [value, setValue] = useState(start);
  
  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;
    
    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      
      setValue(currentValue);
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(countUp);
      }
    };
    
    animationFrameId = requestAnimationFrame(countUp);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [start, end, duration, startCounting]);
  
  return { value, displayValue };
}
