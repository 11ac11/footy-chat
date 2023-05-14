import { Svg, Path } from 'react-native-svg';

const DownChevron = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill={color}
    >
      <Path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" />
    </Svg>
  );
};

export default DownChevron;
