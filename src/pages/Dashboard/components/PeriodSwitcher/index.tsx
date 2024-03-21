import { Button, ButtonGroup, MenuItem, styled } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRef, useState } from "react";
import useIsMobile from "@/hooks/common/useIsMobile";

interface ILargeScreen {
  periodList: string[];
}

interface ISmallScreen extends ILargeScreen {
  period: string;
  handleChange: (event: SelectChangeEvent) => void;
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

  const { isMobile } = useIsMobile();

  return isMobile ? (
    <MobileComponent
      periodList={periods.current}
      period={period}
      handleChange={(e: SelectChangeEvent) => setPeriod(e.target.value)}
    />
  ) : (
    <LargeScreenComponent periodList={periods.current} />
  );
};

export default PeriodSwitcher;
