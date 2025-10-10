import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSearch } from "../../hooks/useSearch";
import { useState } from "react";
import StatusWrapper from "../StatusWrapper/StatusWrapper";

function SearchBar() {
  const { chats, isLoading, isError, getSearch } = useSearch();
  const arr = ["India", "Russia", "Denmark"];
  const [value, setValue] = useState<string>("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Отправляю запрос", value);
          getSearch(value);
          console.log("chats-result", chats);
        }}
      >
        <StatusWrapper isLoading={isLoading} isError={isError}>
          <Stack spacing={2} sx={{ width: 350 }}>
            <Autocomplete
              sx={{
                "& fieldset": {
                  borderRadius: "100px",
                },
                bgcolor: "#5436397A",
                borderRadius: "100px",
              }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={arr.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  sx={{
                    color: "white", //  цвет текста
                    "& .MuiInputBase-input": {
                      color: "white", // цвет введенного текста
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", // цвет label
                    },
                  }}
                  {...params}
                  label="Search input"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                />
              )}
            />
          </Stack>
        </StatusWrapper>
      </form>
    </>
  );
}
export default SearchBar;
