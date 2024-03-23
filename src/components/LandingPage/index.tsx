import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { useLocation } from "react-router-dom";
import { APP_INSTRUCTIONS } from "@/constants";
import useIsMobile from "@/hooks/common/useIsMobile";

const LandingPage = () => {
  const location = useLocation();
  const { isMobile } = useIsMobile();
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            backgroundColor: "background.landingPage",
            height: "100%",
            // width: "100%",
            display: "grid",
            placeItems: "center",
            color: "white",
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant={isMobile ? "h5" : "h3"}
              sx={{ mb: 2 }}
            >
              Start tracking your expenses
            </Typography>
            <Stepper orientation="vertical">
              {APP_INSTRUCTIONS.map((step, idx) => (
                <Step key={step.label} active={true} sx={{ fontSize: "35px" }}>
                  <StepLabel
                    sx={{
                      "& .Mui-active": {
                        "& .MuiStepIcon-root": {
                          color: "#cc9e05",
                          "& .MuiStepIcon-text": { fontSize: "15px" },
                        },
                      },
                    }}
                  >
                    <Typography variant={isMobile ? "h6" : "h5"} color="white">
                      {step.label}
                    </Typography>
                  </StepLabel>
                  {!isMobile && (
                    <StepContent>
                      <Typography>{step.description}</Typography>
                    </StepContent>
                  )}
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        // sx={{ display: "flex", alignItems: "center" }}
      >
        {/* <Logo /> */}
        {/* <img src={ReactLogo} alt="React Logo" /> */}
        {/* <img src={AppLogo} alt="logo" width="10%" /> */}
        {location.pathname.replace("/", "") === "login" ? (
          <Login />
        ) : (
          <Signup />
        )}
      </Grid>
    </Grid>
  );
};

export default LandingPage;
