import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useCreatePoll } from "api/useCreatePoll";
import { PollPrompt } from "components/modular/PollPrompt";
import { PollPromptType } from "constants/PollPromptType";
import React from "react";

import { Controller, useForm } from "react-hook-form";

export const CreatePollForm = () => {
  const [createPollQuery, loading] = useCreatePoll();
  const { handleSubmit, control, setValue, watch, formState } = useForm({
    defaultValues: {
      name: "",
      description: "",
      prompts: [
        {
          description: "",
          type: PollPromptType.OpenBox.name,
          leftLabel: "",
          rightLabel: "",
          options: [],
        },
      ],
    },
  });

  const onSubmit = (data) => {
    for (let i = 0; i < data.prompts.length; i += 1) {
      switch (data.prompts[i].type) {
        case "Open Box":
          delete data.prompts[i].leftLabel;
          delete data.prompts[i].rightLabel;
          delete data.prompts[i].options;
          break;
        case "Multiple Choice":
          delete data.prompts[i].leftLabel;
          delete data.prompts[i].rightLabel;
          break;
        case "Grade":
          delete data.prompts[i].options;
          break;
        default:
          break;
      }
    }
    createPollQuery(data);
  };

  const [promptsValid, setPromptsValid] = React.useState([false]);
  let formValid = !!promptsValid.reduce((prev, curr) => prev && curr);
  formValid = formValid && Object.keys(formState.errors).length === 0;
  const prompts = watch("prompts");
  const addPrompt = () => {
    setPromptsValid([...promptsValid, false]);
    setValue("prompts", [
      ...(prompts ?? []),
      {
        description: "",
        type: PollPromptType.OpenBox.name,
        leftLabel: "",
        rightLabel: "",
        options: [],
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" color="GrayText" gutterBottom>
        {"Poll Info"}
      </Typography>
      <Divider />
      <Box my={2}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: "Poll name required",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Poll Name"
              variant="outlined"
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            label="Poll Description"
            variant="outlined"
            value={value}
            onChange={onChange}
            multiline
            rows={4}
          />
        )}
      />
      <Box
        mt={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5" color="GrayText" gutterBottom>
          {"Poll Prompts"}
        </Typography>
        <Button onClick={addPrompt}>{"Add Prompt"}</Button>
      </Box>
      <Divider />
      <Box mt={2}>
        <Controller
          name="prompts"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value: _prompts } }) => (
            <>
              {_prompts.map((_, i) => (
                <PollPrompt
                  key={"poll-prompt-" + i}
                  prompts={_prompts}
                  index={i}
                  onChange={onChange}
                  promptsValid={promptsValid}
                  setPromptsValid={setPromptsValid}
                  onDeletePrompt={() => {
                    const _promptsValid = [...promptsValid];
                    _promptsValid.splice(i, 1);
                    setPromptsValid(_promptsValid);
                  }}
                />
              ))}
            </>
          )}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={6}>
        <Button
          type="submit"
          disabled={!formValid || loading}
          variant="contained"
          style={{ minWidth: 200 }}
        >
          <Box m={1}>
            <Typography>Create Poll</Typography>
          </Box>
        </Button>
      </Box>
    </form>
  );
};
