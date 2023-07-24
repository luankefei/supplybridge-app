const PurpleDot = (props: any) => {
  // cx and cy are the coordinates of the center of the dot
  // if cx and cy are not provided, use width and height to calculate
  // right now it's just centered
  const { cx, cy, width, height, value, hovered } = props;
  let x = cx - 5;
  let y = cy - 5;
  if (isNaN(x)) {
    x = width / 2 - 5;
  }
  if (isNaN(y)) {
    y = height / 2 - 5;
  }
  return (
    <svg x={x} y={y} width="10" height="10" viewBox="0 0 20 20" fill="none">
      <rect
        x="2"
        y="2"
        width="16"
        height="16"
        rx="8"
        fill="#855CF8"
        stroke="#fff"
        strokeWidth="4"
      />
      <rect x="6" y="6" width="8" height="8" rx="4" fill="#white" />
    </svg>
  );
};

export default PurpleDot;
