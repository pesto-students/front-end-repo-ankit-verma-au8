import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

interface CustomLinearProgressProps extends LinearProgressProps {
  customcolor?: string;
}

const ProgressBar = styled(LinearProgress)<CustomLinearProgressProps>(
  ({ theme, customcolor }) => ({
    height: 12,
    borderRadius: 8,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: customcolor
        ? customcolor
        : theme.palette.mode === "light"
        ? "#B52222"
        : "#308fe8",
    },
  })
);

const BorderLinearProgress = ({ ...rest }) => {
  return <ProgressBar {...rest} />;
};

export default BorderLinearProgress;
