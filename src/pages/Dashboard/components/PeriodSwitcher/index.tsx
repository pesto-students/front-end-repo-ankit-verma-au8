import {
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRef, useState } from "react";

interface ILargeScreen {
  periodList: string[];
}

interface ISmallScreen extends ILargeScreen {
  period: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledButton = styled(Button)(({ value }) => ({
  textTransform: "none",
  ...(!(value === 2) && { borderRight: 0 }),
  ...(!(value === 0) && { borderLeft: 0 }),
  "&:hover": {
    ...(!(value === 2) && { borderRight: 0 }),
    ...(!(value === 0) && { borderLeft: 0 }),
    textDecoration: "underline",
  },
}));

const LargeScreenComponent = ({ periodList }: ILargeScreen) => {
  return (
    <ButtonGroup variant="outlined" size="small">
      {periodList.map((period: string, idx: number) => (
        <StyledButton value={idx} key={idx} size="small">
          {period}
        </StyledButton>
      ))}
    </ButtonGroup>
  );
};

const MobileComponent = ({
  periodList,
  period,
  handleChange,
}: ISmallScreen) => {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={period}
      onChange={handleChange}
      size="small"
    >
      {periodList.map((value, idx) => (
        <MenuItem value={value} key={idx}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
};

const PeriodSwitcher = () => {
  const periods = useRef(["Daily", "Weekly", "Monthly"]);
  const [period, setPeriod] = useState(periods.current[0]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
    <MobileComponent
      periodList={periods.current}
      period={period}
      handleChange={(e) => setPeriod(e)}
    />
  ) : (
    <LargeScreenComponent periodList={periods.current} />
  );
};

export default PeriodSwitcher;
