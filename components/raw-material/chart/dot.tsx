const PurpleDot = (props: any) => {
  const { cx, cy, stroke, payload, value, hovered } = props;

  return (
    <svg
      x={cx - 5}
      y={cy - 5}
      width="10"
      height="10"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x="2"
        y="2"
        width="16"
        height="16"
        rx="8"
        fill="#855CF8"
        stroke="#fff"
        stroke-width="4"
      />
      <rect x="6" y="6" width="8" height="8" rx="4" fill="#white" />
    </svg>
  );
};

export default PurpleDot;
