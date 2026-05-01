import { Line, Svg } from "react-native-svg";

function Xbutton() {
  return (
    <Svg width="30" height="30" viewBox="0 0 24 24">
      <Line
        x1="18"
        y1="6"
        x2="6"
        y2="18"
        stroke="gray"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
        stroke="gray"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default Xbutton;
