import { Container, Typography, styled } from "@mui/material";

const Background = styled("div")({
  position: "relative",
  isolation: "isolate",
  paddingBlock: "6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "20%",

  "&::after": {
    content: "''",
    background:
      "linear-gradient(47deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    transform: "skewY(-5deg)",
  },
});

const SpotlightContainer = styled("div")({
  height: "72vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Spotlight = () => {
  return (
    <SpotlightContainer>
      <Background>
        <Typography
          variant="h2"
          sx={{
            letterSpacing: "-2px",
          }}
        >
          Today's Spotlight
        </Typography>
        <div>
          <img src="https://cataas.com/cat" width={512} />
        </div>
      </Background>
    </SpotlightContainer>
  );
};

export default Spotlight;
