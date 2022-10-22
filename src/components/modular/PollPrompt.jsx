import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PollPromptType } from "constants/PollPromptType";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const OptionRow = ({ options, onChange, index }) => {
  const deleteOption = () => {
    console.log(options);
    const _options = [...options];
    _options.splice(index, 1);
    onChange(_options);
  };

  return (
    <Paper variant="outlined" component={Box} mb={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
        ml={2}
        mr={1}
      >
        <Typography variant="h6" color="GrayText">
          {index + 1 + ". " + options[index]}
        </Typography>
        <IconButton size="small" color="default" onClick={deleteOption}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export const PollPrompt = (props) => {
  const {
    prompts,
    index,
    onChange,
    setPromptsValid,
    promptsValid,
    onDeletePrompt,
  } = props;
  const typeKeys = Object.keys(PollPromptType);
  const { handleSubmit, control, watch, trigger, formState } = useForm({
    reValidateMode: "onBlur",
    defaultValues: { ...prompts[index] },
  });
  const [optionText, setOptionText] = React.useState("");
  const type = watch("type");

  const isValid = Object.keys(formState.errors).length === 0;
  if (promptsValid[index] !== isValid) {
    const _promptsValid = [...promptsValid];
    _promptsValid[index] = isValid;
    setPromptsValid(_promptsValid);
  }

  const onSubmit = React.useCallback(
    (data) => {
      const newPrompts = [...prompts];
      newPrompts[index] = data;
      onChange(newPrompts);
    },
    [index, onChange, prompts]
  );

  React.useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, onSubmit, watch]);

  React.useEffect(() => {
    trigger();
  }, [trigger]);

  const deletePrompt = () => {
    const newPrompts = [...prompts];
    newPrompts.splice(index, 1);
    onChange(newPrompts);
    onDeletePrompt();
  };

  return (
    <Box mb={2}>
      <Card variant="outlined">
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography color="text.secondary" variant="h6">
              {"Poll Prompt #" + (index + 1)}
            </Typography>
            <IconButton
              disabled={prompts.length <= 1}
              size="small"
              color="default"
              onClick={deletePrompt}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <Box mb={2}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: "Prompt description required",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  label="Prompt Description"
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
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="prompt-type-select-label">
                  {"Prompt Type"}
                </InputLabel>
                <Select
                  labelId="prompt-type-select-label"
                  label="Prompt Type"
                  onChange={onChange}
                  value={value}
                >
                  {Object.values(PollPromptType).map((_type, i) => (
                    <MenuItem
                      key={"prompt-type-select-" + typeKeys[i]}
                      value={_type.name}
                    >
                      {_type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="leftLabel"
            control={control}
            rules={{
              validate: (leftLabel) =>
                type !== PollPromptType.Grade.name ||
                leftLabel.length ||
                "Left label required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
              type === PollPromptType.Grade.name && (
                <Box my={2}>
                  <TextField
                    fullWidth
                    label='Grade Left Label, e.g. "Not at all Satisfied"'
                    variant="outlined"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    onChange={onChange}
                  />
                </Box>
              )
            }
          />
          <Controller
            name="rightLabel"
            control={control}
            rules={{
              validate: (rightLabel) =>
                type !== PollPromptType.Grade.name ||
                rightLabel.length ||
                "Right label required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
              type === PollPromptType.Grade.name && (
                <TextField
                  fullWidth
                  label='Grade Right Label, e.g. "Extremely Satisfied"'
                  variant="outlined"
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                />
              )
            }
          />
          <Controller
            name="options"
            control={control}
            rules={{
              validate: (options) =>
                type !== PollPromptType.MultipleChoice.name ||
                options.length ||
                "The multiple choice prompt must have atleast one option",
            }}
            render={({
              field: { onChange: _onChange, value: _options },
              fieldState: { error },
            }) =>
              type === PollPromptType.MultipleChoice.name && (
                <Box>
                  <Box my={2}>
                    <Divider />
                  </Box>
                  {!!error && (
                    <Box mb={2}>
                      <Alert variant="outlined" severity="error">
                        {error.message}
                      </Alert>
                    </Box>
                  )}
                  {_options.map((_, i) => (
                    <OptionRow
                      key={"prompt-" + index + "-option-" + i}
                      options={_options}
                      onChange={_onChange}
                      index={i}
                    />
                  ))}
                  <Box display="flex">
                    <Box pr={2} flexGrow={1}>
                      <TextField
                        fullWidth
                        label="Option Text"
                        variant="outlined"
                        value={optionText}
                        onChange={(e) => setOptionText(e.target.value)}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      disabled={!optionText.length}
                      style={{ minWidth: 200 }}
                      onClick={(e) => {
                        _onChange([..._options, optionText]);
                        setOptionText("");
                      }}
                    >
                      {"Add Option"}
                    </Button>
                  </Box>
                </Box>
              )
            }
          />
        </CardContent>
      </Card>
    </Box>
  );
};
