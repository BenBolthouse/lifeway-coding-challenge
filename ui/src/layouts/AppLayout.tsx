import React from "react";
import SearchSelect from "../components/SearchSelect";
import StarWarsLogo from "../svg/StarWarsLogo";
import styled, { createGlobalStyle } from "styled-components";
import { Outlet } from "react-router-dom";

const GlobalStyles = createGlobalStyle(() => ({
  body: {
    fontFamily: "Sans-Serif",
    margin: 0,
    padding: 0,
  }
}))

const Background = styled.div(() => ({
  backgroundColor: "#26272b",
  height: "100vh",
  width: "100vw",
  display: "grid",
  alignContent: "center",
  justifyContent: "center",
}));

const Container = styled.div(() => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  height: "100vh",
  width: "100vw",
}))

const Header = styled.header(() => ({
  backgroundColor: "#393a3f",
  padding: "1rem",
  display: "grid",
  "@media screen and (min-width: 0px)": {
    gridAutoFlow: "row",
    justifyContent: "center",
    justifyItems: "center",
  },
  "@media screen and (min-width: 768px)": {
    gridAutoFlow: "column",
    justifyContent: "space-between",
  },
}));

const Logo = styled.div(() => ({
  height: "3rem",
  width: "12rem",
  display: "grid",
  gridTemplateRows: "2rem 1rem",
  justifyItems: "center",
}));

const Search = styled.div(() => ({
  height: "2.5rem",
  "@media screen and (min-width: 0px)": {
    marginTop: "0.5rem",
    marginBottom: "0rem",
    width: "22rem",
  },
  "@media screen and (min-width: 768px)": {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
}));

const LogoText = styled.span(() => ({
  letterSpacing: "0.2rem",
  height: "1rem",
  color: "#e1e3eb",
  fontSize: "0.825rem",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const Content = styled.main(() => ({
  display: "grid",
  padding: "1rem",
}));

export default function MobileLayout() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Background>
        <Container>
          <Header>
            <Logo>
              <StarWarsLogo />
              <LogoText>Connect</LogoText>
            </Logo>
            <Search>
              <SearchSelect />
            </Search>
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Container>
      </Background>
    </React.Fragment>
  )
}
