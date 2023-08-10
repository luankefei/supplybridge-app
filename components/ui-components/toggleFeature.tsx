import { Badge, ToggleButton } from "@mui/material";
import { ENV, EnumENVIRONMENT } from "config";
import { useState } from "react";

interface IToggleFeature {
  featureName?: string;
  turnOn?: () => void;
  turnOff?: () => void;
}

/**
 * Toggle certain features on and off
 * Only visible in development mode
 */
const SupToggleFeature = ({ featureName, turnOn, turnOff }: IToggleFeature) => {
  const [isOn, setIsOn] = useState(false);
  if (ENV === EnumENVIRONMENT.production) {
    return null;
  }
  return (
    <Badge
      variant="dot"
      color="info"
      sx={{
        margin: "25px",
      }}
    >
      <ToggleButton
        value={isOn}
        onChange={() => {
          setIsOn(!isOn);
          if (isOn) {
            turnOff && turnOff();
          } else {
            turnOn && turnOn();
          }
        }}
      >
        {`${featureName} :`} {isOn ? "On" : "Off"}
      </ToggleButton>
    </Badge>
  );
};

export default SupToggleFeature;
