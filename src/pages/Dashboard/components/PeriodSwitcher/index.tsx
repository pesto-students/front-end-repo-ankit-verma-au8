import {
  MenuItem,
  styled,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRef, useState } from "react";
import useIsMobile from "@/hooks/common/useIsMobile";

interface ILargeScreen {
  periodList: string[];
  period: string;
  handleChange: (_: any, period: string) => void;
}

interface PeriodSwitcherProps {
  updateChartData: (month: string) => void;
}

interface ISmallScreen {
  period: string;
  periodList: string[];
  handleChange: (event: SelectChangeEvent, period: string) => void;
}

const StyledButton = styled(ToggleButton)(() => ({
  textTransform: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const LargeScreenComponent = ({
  period,
  periodList,
  handleChange,
}: ILargeScreen) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={period}
      exclusive
      onChange={handleChange}
    >
      {periodList.map((period: string, idx: number) => (
        <StyledButton color="primary" value={period} key={idx} size="small">
          {period}
        </StyledButton>
      ))}
    </ToggleButtonGroup>
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
      onChange={(e) => handleChange(e, e.target.value)}
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

const PeriodSwitcher = ({ updateChartData }: PeriodSwitcherProps) => {
  const periods = useRef(["Daily", "Weekly", "Monthly"]);
  const [period, setPeriod] = useState(periods.current[0]);

  const { isMobile } = useIsMobile();

  const handlePeriodChange = (_: any, newPeriod: string) => {
    console.log;
    updateChartData(newPeriod.toLowerCase());
    setPeriod(newPeriod);
  };

  return isMobile ? (
    <MobileComponent
      periodList={periods.current}
      period={period}
      handleChange={handlePeriodChange}
    />
  ) : (
    <LargeScreenComponent
      periodList={periods.current}
      period={period}
      handleChange={handlePeriodChange}
    />
  );
};

export default PeriodSwitcher;
