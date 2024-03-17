import { Ref, forwardRef } from "react";
import { Dayjs } from "dayjs";
import { DemoItem as Container } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as Picker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  label: string;
  value: Dayjs | null;
  minDate?: Dayjs | null;
  onChange?: (e: any) => void;
}

const DatePicker = forwardRef(
  ({ label, value, onChange, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <Picker
            label={label}
            value={value}
            onChange={onChange}
            inputRef={ref}
            sx={{ width: "100%" }}
            disableHighlightToday
            {...rest}
          />
        </Container>
      </LocalizationProvider>
    );
  }
);

export default DatePicker;
