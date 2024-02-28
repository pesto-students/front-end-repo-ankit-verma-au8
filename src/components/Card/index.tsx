import { Card as MUICard, CardContent } from "@mui/material";

interface CardProps {
  children: React.ReactNode;
  sx?: object;
}

const Card = ({ children, sx, ...rest }: CardProps) => {
  return (
    <MUICard sx={sx} raised={true}>
      <CardContent>{children}</CardContent>
    </MUICard>
  );
};

export default Card;
