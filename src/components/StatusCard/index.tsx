import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const StatusCard = ({
  primary,
  type,
  primaryStyle,
  secondaryStyle,
}: {
  primary: string;
  type: any;
  primaryStyle?: object;
  secondaryStyle?: object;
}) => {
  return (
    <Box sx={{ ...primaryStyle }}>
      <ErrorIcon
        color={type}
        fontSize="large"
        sx={{ ...secondaryStyle, fontSize: 60, mb: 1 }}
      />
      <Typography variant="h6">{primary}</Typography>
    </Box>
  );
};

export default StatusCard;
