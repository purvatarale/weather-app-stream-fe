"use client";
import {
  ReactNode,
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DeviceContext = createContext(false);

interface IDeviceProviderProps {
  children: ReactNode;
  value: boolean | null;
}

export const STANDARD_BREAKPOINT = 768;

export function DeviceProvider(props: IDeviceProviderProps) {
  const { children, value } = props;
  const [isSmall, setSmall] = useState<boolean>();
  const listener = useCallback(() => {
    setSmall(window.innerWidth < STANDARD_BREAKPOINT);
  }, []);
  useEffect(() => {
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [listener]);

  return createElement(
    DeviceContext.Provider,
    { value: isSmall === undefined ? value! : isSmall },
    children,
  );
}

export function useDevice() {
  return useContext(DeviceContext);
}
