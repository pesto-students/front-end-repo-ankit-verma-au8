import { Card as MUICard, CardContent } from "@mui/material";

interface CardProps {
  children: React.ReactNode;
  sx?: object;
}

const Card = ({ children, sx, ...rest }: CardProps) => {
  return (
    <MUICard sx={{ borderRadius: 2, ...sx }} raised={true} {...rest}>
      <CardContent sx={{ height: "100%" }}>{children}</CardContent>
    </MUICard>
  );
};

export default Card;
