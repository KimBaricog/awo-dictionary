import React from "react";
import { Path, Svg } from "react-native-svg";

const Playbtn: React.FC = () => {
  return (
    <Svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
      <Path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z" fill="#575757" />
    </Svg>
  );
};

export default Playbtn;
