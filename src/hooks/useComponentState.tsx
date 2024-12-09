import { useState, useEffect, useRef } from 'react';

type ComponentState = 'mounting' | 'mounted' | 'updating' | 'unmounting' | 'unmounted';

export const useComponentState = () => {
  const [state, setState] = useState<ComponentState>('mounting');
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      // First render - mounting phase
      setState('mounted');
      mountedRef.current = true;
    }

    // Cleanup function for unmounting
    return () => {
      setState('unmounting');
      setTimeout(() => setState('unmounted'), 0);
    };
  }, []);

  const handleUpdate = () => {
    if (mountedRef.current) {
      setState('updating');
      setTimeout(() => setState('mounted'), 0);
    }
  };

  return {
    state,
    isInitialMount: state === 'mounting',
    isMounted: state === 'mounted',
    isUpdating: state === 'updating',
    isUnmounting: state === 'unmounting',
    isUnmounted: state === 'unmounted',
    triggerUpdate: handleUpdate
  };
};