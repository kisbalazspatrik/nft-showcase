import { Button, Flex, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const ColorModeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={toggleColorMode}
      borderRadius={12}
      p={2}
      cursor="pointer"
      transition={"all 0.2s ease-in-out"}
    >
      {colorMode === "light" ? "🌙" : "☀️"}
    </Button>
  );
};

export default ColorModeSwitch;
