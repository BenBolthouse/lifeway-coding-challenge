import React from "react";
import { AppContext } from "../contexts/AppContext";
import { IoPersonSharp, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSearchPeople } from "../hooks/api-hooks";
import styled from "styled-components"
import TextInput from "./inputs/TextInput";

const Anchor = styled.div(() => ({
  position: "relative",
  zIndex: 3,
}));

const Input = styled.div(() => ({
  display: "grid",
  gridTemplateRows: "auto auto",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 2,
}));

const Results = styled.div(() => ({
  backgroundColor: "#e1e3eb",
  borderRadius: "0.25rem",
  borderTop: "1px solid #acb1c5",
  left: 0,
  overflow: "hidden",
  paddingTop: "1rem",
  position: "absolute",
  right: 0,
  top: "1.5rem",
  zIndex: 1,
  "a": {
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
}));

const Result = styled.div(() => ({
  backgroundColor: "#cbced9",
  borderTop: "1px solid #acb1c5",
  height: "srem",
  lineHeight: "srem",
  paddingTop: "0.25rem",
  paddingRight: "0.5rem",
  paddingLeft: "0.5rem",
  paddingBottom: "0.25rem",
  display: "grid",
  gridTemplateColumns: "auto 1fr 1.75rem",
  gap: "0.5rem",
}));

const PersonNameText = styled.span(() => ({
  color: "#19191c",
  display: "block",
  fontSize: "0.825rem",
  fontWeight: "bold",
  height: "2rem",
  lineHeight: "2rem",
  textAlign: "left",
}));

const PersonHomeworldText = styled.span(() => ({
  color: "#686877",
  display: "block",
  fontSize: "0.825rem",
  fontStyle: "italic",
  height: "2rem",
  lineHeight: "2rem",
  textAlign: "left",
}));

const NoResultsText = styled.span(() => ({
  display: "block",
  color: "#000000",
  fontSize: "0.825rem",
  fontStyle: "italic",
  height: "2rem",
  lineHeight: "2rem",
  textAlign: "center",
}));

export default function SearchSelect() {
  const appContext = React.useContext(AppContext);

  const [value, setValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const { search, pending, data } = useSearchPeople({
    homeworld: true,
  });

  React.useEffect(() => {
    let abort = () => undefined as void;

    const timeout = setTimeout(() => {
      abort = search(value);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      abort();
    };
  }, [
    value,
  ]);

  function onChangeTextInput(evt: React.ChangeEvent<HTMLInputElement>) {
    setValue(evt.target.value)
  }

  function onClickContainer() {
    setIsFocused(true);
    appContext.registerTouchOutsideCallback("search-select-cb", () => {
      setIsFocused(false);
    });
  }

  function onClickResult() {
    setIsFocused(false);
    setValue("");
  }

  return (
    <Anchor>
      <Input onClick={onClickContainer}>
        <TextInput
          size="lg"
          icon={IoSearchSharp}
          onChange={onChangeTextInput}
          pending={pending}
          value={value}
          placeholder="Search..."
        />
      </Input>
      <Results>
        {data && isFocused &&
          <React.Fragment>
            {
              data.length ? (
                data.map((person, i) => (
                  <Link key={i} to={`/profiles/${person.id}`}>
                    <Result onClick={onClickResult}>
                      <PersonNameText>
                        {person.name}
                      </PersonNameText>
                      {person.homeworld?.name &&
                        <PersonHomeworldText>
                          {person.homeworld.name}
                        </PersonHomeworldText>
                      }
                      <IoPersonSharp
                        size={"1rem"}
                        color="#6d6d77"
                        style={{
                          alignSelf: "center",
                          justifySelf: "center",
                        }}
                      />
                    </Result>
                  </Link>
                ))
              ) : (
                <Result>
                  <NoResultsText>
                    No Results
                  </NoResultsText>
                </Result>
              )
            }
          </React.Fragment>
        }
      </Results>
    </Anchor>
  );
}
