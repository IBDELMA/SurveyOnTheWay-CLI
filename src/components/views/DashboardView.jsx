import { ContentCopy } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Pagination,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { useGetResponses } from "api/useGetResponses";
import { useGetUserPolls } from "api/useGetUserPolls";
import { NavBar } from "components/nav/NavBar";
import { PollPromptType } from "constants/PollPromptType";
import { Paths } from "paths";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PaginatedResponses = ({ responses }) => {
  const [page, setPage] = React.useState(1);
  console.log(responses);
  return (
    <Box mt={1}>
      {!responses.length && (
        <Typography color="GrayText">
          <i>{"No Responses Yet..."}</i>
        </Typography>
      )}
      <Box mb={2}>
        <Typography variant="h6">{responses[page - 1]}</Typography>
      </Box>
      {!!responses.length && (
        <Box display="flex" justifyContent="center">
          <Pagination
            page={page}
            count={responses.length}
            onChange={(_, page) => setPage(page)}
          />
        </Box>
      )}
    </Box>
  );
};

const ChartedResponses = ({ display, responsesCount, labels }) => {
  return (
    <Box mt={2}>
      {!display ? (
        <Typography color="GrayText">
          <i>{"No Responses Yet..."}</i>
        </Typography>
      ) : (
        <Bar
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
          data={{
            labels,
            datasets: [
              {
                label: "Responses",
                data: responsesCount,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
      )}
    </Box>
  );
};

const Responses = ({ poll }) => {
  const { data: responses } = useGetResponses(poll.pollId);

  const renderPrompt = (prompt, index) => {
    let promptBody = null;
    const _responses = responses.map((r) => r.values[index]);
    console.log(_responses);
    let labels = [];
    let responsesCount = [];
    switch (prompt.type) {
      case PollPromptType.OpenBox.name:
        promptBody = <PaginatedResponses responses={_responses} />;
        break;
      case PollPromptType.MultipleChoice.name:
        labels = prompt.options;
        responsesCount = labels.map(
          (label) => _responses.filter((value) => value === label).length
        );
        promptBody = (
          <ChartedResponses
            display={_responses.length > 0}
            labels={labels}
            responsesCount={responsesCount}
          />
        );
        break;
      case PollPromptType.Grade.name:
        labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        responsesCount = labels.map(
          (label) => _responses.filter((value) => value === label).length
        );
        promptBody = (
          <ChartedResponses
            display={_responses.length > 0}
            labels={labels}
            responsesCount={responsesCount}
          />
        );
        break;
      default:
        break;
    }

    return (
      <Box mb={3} key={"prompt-" + index}>
        <Card variant="outlined">
          <CardContent>
            <Box mx={1.5}>
              <Typography color="text.secondary" variant="h6">
                {prompt.description}
              </Typography>
              {promptBody}
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

  return (
    !!responses && (
      <Box mt={4}>
        <Typography variant="h4">{"Poll Responses"}</Typography>
        <Box my={1.5}>
          <Divider />
        </Box>
        <Typography variant="h6" gutterBottom>
          <b>{"Number of Responses: "}</b>
          {responses.length}
        </Typography>
        <Box mt={2}>
          {poll.prompts.map((prompt, i) => renderPrompt(prompt, i))}
        </Box>
      </Box>
    )
  );
};

export const DashboardView = () => {
  const { data } = useGetUserPolls();
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectedPoll = data?.[selectedIndex];
  const pollURL = window.location.href + "poll/" + selectedPoll?.pollId;
  const [open, setOpen] = React.useState(false);
  return (
    <Container maxWidth="xl">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        open={open}
        onClose={() => setOpen(false)}
        color="success"
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {"Copied Poll URL to Clipboard"}
        </Alert>
      </Snackbar>
      <NavBar />
      <Box mt={1} mb={4}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            {selectedPoll && (
              <>
                <Box>
                  <Typography variant="h4">{"Poll Info"}</Typography>
                  <Box my={1.5}>
                    <Divider />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    <b>{"Name: "}</b>
                    {selectedPoll.name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    <b>{"Redirect URL: "}</b>
                    {selectedPoll.redirectURL}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    <b>{"Description: "}</b>
                    {selectedPoll.description}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                      <b>{"Poll URL: "}</b>
                      <Link to={Paths.poll(selectedPoll.pollId)}>
                        {pollURL}
                      </Link>
                    </Typography>
                    <Box ml={1}>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          navigator.clipboard.writeText(pollURL);
                        }}
                        color="primary"
                      >
                        <ContentCopy />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Responses poll={selectedPoll} />
              </>
            )}
          </Grid>
          <Grid item xs={4}>
            <Box
              style={{
                backgroundColor: theme.palette.grey[500],
                borderRadius: 4,
              }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <List dense>
                {!!data &&
                  data.map((item, index) => (
                    <ListItem key={"item-" + index}>
                      <ListItemButton
                        style={{
                          borderRadius: 4,
                          backgroundColor:
                            index === selectedIndex
                              ? theme.palette.grey[600]
                              : "inherit",
                        }}
                        onClick={() => setSelectedIndex(index)}
                      >
                        <Box display="flex" flexDirection="column">
                          <Typography color="white" variant="body2">
                            <b>{item.name}</b>
                          </Typography>
                          <Typography color="white" variant="body2">
                            {item.pollId}
                          </Typography>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(Paths.createPoll())}
                >
                  {"Create New Poll"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
