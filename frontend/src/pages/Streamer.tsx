import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import StreamerHeader from "../components/StreamerHeader";
import { Streamer as StreamerType } from "../types";
import { Fade, Paper, Typography, styled } from "@mui/material";

const Description = styled(Paper)({
  width: "40rem",
  minHeight: "10rem",
  borderRadius: "1rem",
  margin: "1rem",
  padding: "1rem",
});

const StreamerType = () => {
  const params = useParams();
  const { data, isLoading, isError, error } = useQuery(["streamer"], {
    queryFn: (): Promise<StreamerType> => {
      return fetch(`/api/streamers/${params.id}`).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw resp;
      });
    },
  });

  if (isLoading) {
    return null;
  }

  if (isError) {
    <Typography variant="h2">An error has occured</Typography>;
  }

  return (
    <Fade in>
      <div>
        <StreamerHeader
          text={`${data?.platform} streamer`}
          streamer={data!}
          img="https://cataas.com/cat"
        />
        <Description>{data?.description}</Description>
      </div>
    </Fade>
  );
};

export default StreamerType;
