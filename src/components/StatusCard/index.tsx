import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const StatusCard = ({
  primary,
  type,
  sx,
}: {
  primary: string;
  type: any;
  sx?: object;
}) => {
  return (
    <Box>
      <ErrorIcon
        color={type}
        fontSize="large"
        sx={{ ...sx, fontSize: 60, mb: 1 }}
      />
      <Typography variant="h6">{primary}</Typography>
    </Box>
  );
};

export default StatusCard;
