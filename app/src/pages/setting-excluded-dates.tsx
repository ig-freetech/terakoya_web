import React from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import { useSettingExcludedDates } from "@hooks/pages/setting-excluded-dates";
import ReactLoading from "react-loading";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Page() {
  const {
    isLoading,
    onUpdate,
    onAddDateTextBox,
    onDeleteDateTextBox,
    control,
    fields,
    hasError,
    helperText,
  } = useSettingExcludedDates();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: "calc(100vh * 0.05)",
          marginBottom: "calc(100vh * 0.05)",
        }}
      >
        <Paper
          sx={{
            minHeight: "calc(100vh * 0.9)",
            minWidth: "calc(100vw * 0.9)",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box flexDirection="column">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: "#4a90e2", height: "calc(100vh * 0.1)" }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                }}
              >
                Setting Excluded Dates
              </Typography>
            </Box>
            <form onSubmit={onUpdate}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  {fields.map((field, index) => (
                    <Box display="flex" alignItems="center" key={field.id}>
                      <Tooltip title="Delete Date Text Box">
                        <Button
                          onClick={() => onDeleteDateTextBox(index)}
                          type="button"
                          color="secondary"
                          variant="outlined"
                          sx={{ marginRight: 1 }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                      <Controller
                        control={control}
                        name={`dates.${index}`}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            error={hasError(index)}
                            helperText={helperText(index)}
                            placeholder="2023-01-01"
                            variant="outlined"
                            sx={{ marginTop: 1 }}
                          />
                        )}
                      />
                      {index === fields.length - 1 && (
                        <Tooltip title="空のテキストボックスがある状態では追加はできません">
                          <Button
                            onClick={onAddDateTextBox}
                            type="button"
                            color="secondary"
                            variant="contained"
                            sx={{ marginLeft: 1 }}
                          >
                            +
                          </Button>
                        </Tooltip>
                      )}
                    </Box>
                  ))}
                </Box>
                {isLoading ? (
                  <>
                    <ReactLoading type="spin" color="#866440" />
                    <Typography>Processing...</Typography>
                  </>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "200px", marginTop: 5, marginBottom: 5 }}
                  >
                    Update
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
