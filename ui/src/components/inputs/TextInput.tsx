import React from "react";
import { IconBaseProps } from "react-icons";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

type InputProps<TInput> = {
  size:
  | "sm"
  | "md"
  | "lg"
  icon?: React.ComponentType<IconBaseProps>
  pending?: boolean
  disabled?: boolean
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (evt: React.ChangeEvent<TInput>) => void
}

const Container = styled.div((props) => ({
  backgroundColor: "#e1e3eb",
  borderRadius: "0.25rem",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr auto",
}))

const Input = styled.input((props) => ({
  background: "none",
  border: "none",
  borderRadius: "0.25rem",
  height: "100%",
  paddingTop: "0rem",
  paddingRight: "0.5rem",
  paddingBottom: "0rem",
  paddingLeft: "0.5rem",
  outline: "none",
  textOverflow: "ellipsis",
}));

export default function TextInput({ icon: Icon, ...props }: InputProps<HTMLInputElement>) {
  let iconSize = "0rem";
  let containerHeight = "0rem";

  switch (props.size) {
    case "sm":
      iconSize = "1.5rem";
      containerHeight = "1.5rem";
      break;
    case "md":
      iconSize = "1.5rem";
      containerHeight = "2rem";
      break;
    case "lg":
      iconSize = "1.5rem";
      containerHeight = "2.5rem";
      break;
  };

  const [focused, setFocused] = React.useState(false);
  const [blurred, setBlurred] = React.useState(false);
  const [value, setValue] = React.useState("");

  function onFocus() {
    props.onFocus && props.onFocus();
    setFocused(true);
    setBlurred(false);
  }

  function onBlur() {
    props.onBlur && props.onBlur();
    setFocused(false);
    setBlurred(true);
  }

  function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
    props.onChange && props.onChange(evt);
    setValue(evt.target.value)
  }

  const iconOpacity = focused ? 1 : 0.5;
  const placeholder = focused ? "" : props.placeholder;
  const pending = props.pending ? true : false;

  return (
    <Container
      style={{
        height: containerHeight
      }}
    >
      <Input
        type="text"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
      {(pending || Icon) &&
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            width: containerHeight,
          }}
        >
          {pending &&
            <Oval
              height={"1.25rem"}
              width={"1.25rem"}
              color="#000000"
              secondaryColor="#0000007a"
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          }
          {!pending && Icon &&
            <Icon
              size={iconSize}
              opacity={iconOpacity}
            />
          }
        </div>
      }
    </Container>
  );
}
