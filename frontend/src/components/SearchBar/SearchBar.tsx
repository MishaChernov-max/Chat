import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSearch } from "../../hooks/useSearch";
import { useRef, useState } from "react";
import StatusWrapper from "../StatusWrapper/StatusWrapper";

function SearchBar() {
  const { chats, isLoading, isError, getSearch } = useSearch();
  const [value, setValue] = useState<string>("");
  let timerRef = useRef<number>(null);
  const handleChange = (value: string) => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      getSearch(value);
    }, 1200);
  };
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
              options={[]}
              renderInput={(params) => (
                <TextField
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setValue(e.target.value);
                    handleChange(e.target.value);
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
