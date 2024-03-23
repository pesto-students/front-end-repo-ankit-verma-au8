import logo from "@/assets/app-logo.png";

const AppLogo = ({
  height,
  width,
  ...rest
}: {
  height: any;
  width: any;
  rest?: any;
}) => {
  console.log("height and with in ", height, width);
  return (
    <img
      src={logo}
      alt="WhatSpend Logo"
      height={height}
      width={width}
      {...rest}
    />
  );
};

export default AppLogo;
