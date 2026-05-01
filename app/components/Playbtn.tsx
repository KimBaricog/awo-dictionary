import React from "react";
import { Path, Svg } from "react-native-svg";

const Playbtn: React.FC = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 16 16" fill="none">
      <Path fill="#ffffff" d="M2 1v14l12-7z" />
    </Svg>
  );
};

export default Playbtn;
