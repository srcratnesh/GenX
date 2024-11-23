import { Switch as ChakraSwitch, Icon } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

// Custom Switch component
const SwitchButton = ({ isChecked, onChange }) => {
  return (
    <ChakraSwitch
      
      size="lg"
      colorScheme="blue"
      trackLabel={{
        on: (
          <Icon color="yellow.400">
            <FaSun />
          </Icon>
        ),
        off: (
          <Icon color="gray.400">
            <FaMoon />
          </Icon>
        ),
      }}
    />
  );
};

export default SwitchButton;
