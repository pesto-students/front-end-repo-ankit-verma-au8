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
