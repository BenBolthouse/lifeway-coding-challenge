import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div(() => ({
  display: "grid",
  gridAutoFlow: "row",
  placeItems: "center",
  placeSelf: "center",
  rowGap: "3rem",
  "a": {
    textDecoration: "none",
  },
}));

const NoContentText = styled.span(() => ({
  color: "#e1e3eb",
  fontSize: "2rem",
}));

const HomeLink = styled.span(() => ({
  display: "grid",
  gridTemplateColumns: "1.5rem auto",
  gap: "0.5rem",
  color: "#e1e3eb",
  fontSize: "1.5rem",
  placeItems: "center",
}));

export default function NoContentArea() {
  return (
    <Container>
      <NoContentText>
        These are not the droids you're looking for.
      </NoContentText>
      <Link to="/">
        <HomeLink>
          <IoArrowBackSharp size={"1.5rem"} />
          <span>
            Back to safety
          </span>
        </HomeLink>
      </Link>
    </Container>
  );
}
