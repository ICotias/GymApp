declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  interface SvgComponentProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
  }
  const SvgComponent: React.FC<SvgComponentProps>;
  export default SvgComponent;
}
