import React from "react";
import styled from "styled-components";

type TouchOutsideCallback = () => void

type TouchOutsideCallbackDictionary = { [key: string]: TouchOutsideCallback }

type AppContextState = {
  registerTouchOutsideCallback: (key: string, callback: TouchOutsideCallback) => void
}

const initialState: AppContextState = {
  registerTouchOutsideCallback: () => { }
}

export const AppContext = React.createContext<AppContextState>(initialState);

const Container = styled.div(() => ({
  position: "relative",
  height: "100vh",
  width: "100vw",
  zIndex: 1,
}));

const Children = styled.div(() => ({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}));

const TouchOutside = styled.div(() => ({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
}));

export default function AppProvider({ children }: React.PropsWithChildren<{}>) {
  const [isTouchOutsideReady, setIsTouchOutsideReady] = React.useState<boolean>(false);
  const [touchOutsideCallbacks, setTouchOutsideCallbacks] = React.useState<TouchOutsideCallbackDictionary>({});

  function registerTouchOutsideCallback(key: string, callback: TouchOutsideCallback) {
    setIsTouchOutsideReady(true);

    if (!touchOutsideCallbacks[key]) {
      setTouchOutsideCallbacks((state) => ({ ...state, [key]: callback }));
    }
  }

  function onTouchOutside() {
    Object.values(touchOutsideCallbacks).forEach((callback) => callback());
    setTouchOutsideCallbacks({});
    setIsTouchOutsideReady(false);
  }

  const value = {
    registerTouchOutsideCallback,
  }

  return (
    <Container>
      <AppContext.Provider value={value}>
        {isTouchOutsideReady &&
          <TouchOutside onClick={onTouchOutside} />
        }
        <Children>
          {children}
        </Children>
      </AppContext.Provider>
    </Container>
  )
}
