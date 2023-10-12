import React from "react";
import styled from "styled-components";

type ClickOutsideCallback = () => void

type AppContextState = {
  enableClickOutside: (callback?: ClickOutsideCallback) => void
  disableClickOutside: () => void
}

const initialState: AppContextState = {
  enableClickOutside: () => null,
  disableClickOutside: () => null,
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

const ClickOutside = styled.div(() => ({
  position: "absolute",
  backgroundColor: "#1c1f29bf",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
}));

export default function AppProvider({ children }: React.PropsWithChildren<{}>) {
  const [isClickOutsideVisible, setIsClickOutsideVisible] = React.useState<boolean>(false);
  const [clickOutsideCallbacks, setClickOutsideCallbacks] = React.useState<ClickOutsideCallback[]>([]);

  function enableClickOutside(callback?: ClickOutsideCallback) {
    setIsClickOutsideVisible(true);
    callback && setClickOutsideCallbacks([...clickOutsideCallbacks, callback]);
  }

  function disableClickOutside() {
    clickOutsideCallbacks.forEach((callback) => callback());
    setIsClickOutsideVisible(false);
    setClickOutsideCallbacks([]);
  }

  const value = {
    enableClickOutside,
    disableClickOutside,
  }

  return (
    <Container>
      <AppContext.Provider value={value}>
        {isClickOutsideVisible &&
          <ClickOutside onClick={disableClickOutside} />
        }
        <Children>
          {children}
        </Children>
      </AppContext.Provider>
    </Container>
  )
}
