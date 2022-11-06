import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { PollPromptType } from "constants/PollPromptType";
import React from "react";

export const Prompt = ({ prompt, index, setValue, value }) => {
  const renderPromptBody = (_prompt) => {
    console.log(_prompt.type);
    switch (_prompt.type) {
      case PollPromptType.OpenBox.name:
        return (
          <Box mt={2}>
            <TextField
              fullWidth
              label="Response"
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              multiline
              rows={4}
            />
          </Box>
        );
      case PollPromptType.MultipleChoice.name:
        return (
          <FormControl>
            <RadioGroup
              value={value}
              onChange={(e, _value) => setValue(_value)}
            >
              {_prompt.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={index + "-multiple-choice-" + optionIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case PollPromptType.Grade.name:
        return (
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body1" color="GrayText">
                {_prompt.leftLabel}
              </Typography>
              <Typography variant="body1" color="GrayText">
                {_prompt.rightLabel}
              </Typography>
            </Box>
            <Slider
              value={Number(value)}
              onChange={(e, _value) => setValue(String(_value))}
              step={1}
              marks
              min={1}
              max={10}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box mb={3}>
      <Card variant="outlined">
        <CardContent>
          <Box mx={1.5}>
            <Typography color="text.secondary" variant="h6">
              {prompt.description}
            </Typography>
            <Box mt={1}>{renderPromptBody(prompt)}</Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
