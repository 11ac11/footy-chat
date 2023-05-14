import { Svg, Circle, ClipPath, Rect } from 'react-native-svg';

const TeamCircleSplit = ({ color1, color2, size }) => {
  return (
    <Svg viewBox="0 0 100 100" width={size} height={size}>
      <Circle
        cx="50"
        cy="50"
        r="40"
        fill={color1}
        stroke="white"
        strokeWidth="2"
      />
      <Circle cx="50" cy="50" r="40" fill={color2} clipPath="url(#clip)" />
      <ClipPath id="clip">
        <Rect x="50" y="0" width="40" height="100" />
      </ClipPath>
      <Circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="white"
        strokeWidth="5"
      />
    </Svg>
  );
};

export default TeamCircleSplit;
