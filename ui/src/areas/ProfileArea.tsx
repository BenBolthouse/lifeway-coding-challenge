import React from "react";
import { IoBodyOutline, IoPlanetOutline, IoRocketOutline } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import { useGetPerson } from "../hooks/data-hooks";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div(() => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
}));

const Detail = styled.div(() => ({
  display: "grid",
  borderRadius: "0.25rem",
  backgroundColor: "#e1e2eb",
  marginTop: "2rem",
  marginRight: "2rem",
  marginLeft: "2rem",
  "@media screen and (min-width: 768px)": {
    gridTemplateColumns: "auto 1fr",
    height: "12rem",
  },
}));

const DetailSkeleton = styled.div(() => ({
  display: "grid",
  borderRadius: "0.25rem",
  backgroundColor: "#2d2d39",
  marginTop: "2rem",
  marginRight: "2rem",
  marginLeft: "2rem",
  "@media screen and (min-width: 768px)": {
    height: "12rem",
  },
}));

const DetailPicture = styled.div(() => ({
  "@media screen and (min-width: 768px)": {
    backgroundColor: "#cbced9",
    borderRadius: "50%",
    height: "10rem",
    width: "10rem",
    margin: "1rem",
  },
}));

const DetailContent = styled.div(() => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  alignContent: "start",
  "@media screen and (min-width: 768px)": {
    marginTop: "2rem",
    marginRight: "2rem",
    marginBottom: "2rem",
  },
}));

const DetailGroup1 = styled.div(() => ({
  display: "grid",
  gridAutoFlow: "row",
}));

const DetailGroup2 = styled.div(() => ({
  marginTop: "0.875rem",
  display: "grid",
  gridAutoFlow: "row",
  alignContent: "start",
}));

const DetailGroup3 = styled.div(() => ({
  marginTop: "0.875rem",
  display: "grid",
  gridAutoFlow: "row",
  alignContent: "start",
}));

const DetailName = styled.span(() => ({
  height: "2rem",
  lineHeight: "2rem",
  fontSize: "2rem",
  fontWeight: "bolder",
  marginTop: "0.375rem",
  marginBottom: "0.375rem",
}));

const DetailRow1 = styled.div(() => ({
  height: "1.5rem",
  marginTop: "0.125rem",
  marginBottom: "0.125rem",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
}));

const DetailRowText1 = styled.span(() => ({
  height: "1.5rem",
  lineHeight: "1.5rem",
  marginLeft: "1rem",
  textTransform: "capitalize",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

const DetailRow2 = styled.div(() => ({
  height: "1.25rem",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
}));

const DetailGroupHeading2 = styled.span(() => ({
  fontSize: "0.825rem",
  fontWeight: "bold",
  letterSpacing: "0.8px",
  height: "2rem",
  lineHeight: "2rem",
  opacity: 0.5,
  textTransform: "uppercase"
}));

const DetailRowLabel2 = styled.span(() => ({
  fontSize: "0.825rem",
  height: "1rem",
  lineHeight: "1rem",
  marginTop: "0.25rem",
  fontWeight: "bolder",
  marginRight: "0.5rem",
  opacity: 0.5,
}));

const DetailRowText2 = styled.span(() => ({
  fontSize: "0.825rem",
  height: "1rem",
  lineHeight: "1rem",
  marginTop: "0.25rem",
  opacity: 0.5,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

export default function ProfileArea() {
  const params = useParams();

  const [personId, setPersonId] = React.useState<number>(0);
  const [get, data, pending] = useGetPerson(0, {
    starships: true,
    homeworld: true,
    films: true,
    species: true,
  });

  React.useEffect(() => {
    if (params.personId === "me") {
      setPersonId(4);
    }
    else if (params.personId) {
      setPersonId(parseInt(params.personId));
    }
  }, [
    params.personId,
  ]);

  React.useEffect(() => {

    const abort = personId ? get(personId) : () => null;

    return () => abort();
  }, [
    personId,
  ])

  return (
    <Container>
      {pending
        ? (
          <DetailSkeleton>
            <Oval
              height={"3rem"}
              width={"3rem"}
              color="#e1e3eb"
              secondaryColor="#e1e3eb7a"
              strokeWidth={2}
              strokeWidthSecondary={2}
              wrapperStyle={{
                placeSelf: "center"
              }}
            />
          </DetailSkeleton>
        )
        : (
          <Detail>
            <DetailPicture />
            <DetailContent>
              <DetailGroup1>
                <DetailName>
                  {data?.name}
                </DetailName>
                <DetailRow1>
                  <IoPlanetOutline size={"1.5rem"} />
                  <DetailRowText1>
                    {data?.homeworld?.name}
                  </DetailRowText1>
                </DetailRow1>
                <DetailRow1>
                  <IoRocketOutline size={"1.5rem"} />
                  <DetailRowText1>
                    {data?.starships?.length
                      ? data.starships.flatMap((starship) => starship.name).join(", ")
                      : "None"
                    }
                  </DetailRowText1>
                </DetailRow1>
                <DetailRow1>
                  <IoBodyOutline size={"1.5rem"} />
                  <DetailRowText1>
                    {data?.species?.length
                      ? data.species.flatMap((species) => species.name).join(", ")
                      : "Unknown"
                    }
                  </DetailRowText1>
                </DetailRow1>
              </DetailGroup1>
              <DetailGroup2>
                <DetailGroupHeading2>
                  Details
                </DetailGroupHeading2>
                <DetailRow2>
                  <DetailRowLabel2>
                    Height:
                  </DetailRowLabel2>
                  <DetailRowText2>
                    {data?.height
                      ? data?.height + " cm"
                      : "Unknown"
                    }
                  </DetailRowText2>
                </DetailRow2>
                <DetailRow2>
                  <DetailRowLabel2>
                    Weight:
                  </DetailRowLabel2>
                  <DetailRowText2>
                    {data?.mass
                      ? data?.mass + " kg"
                      : "Unknown"
                    }
                  </DetailRowText2>
                </DetailRow2>
                <DetailRow2>
                  <DetailRowLabel2>
                    Hair Color:
                  </DetailRowLabel2>
                  <DetailRowText2>
                    {data?.hairColor || "Unknown"}
                  </DetailRowText2>
                </DetailRow2>
                <DetailRow2>
                  <DetailRowLabel2>
                    Birth Year:
                  </DetailRowLabel2>
                  <DetailRowText2>
                    {data?.birthYear || "Unknown"}
                  </DetailRowText2>
                </DetailRow2>
              </DetailGroup2>
              <DetailGroup3>
                <DetailGroupHeading2>
                  Films
                </DetailGroupHeading2>
                {data?.films?.map((film, i) => (
                  <DetailRow2 key={i}>
                    <DetailRowText2>
                      {film.title}
                    </DetailRowText2>
                  </DetailRow2>
                ))}
              </DetailGroup3>
            </DetailContent>
          </Detail>
        )
      }

    </Container>
  );
}
