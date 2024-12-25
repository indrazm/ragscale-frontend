import { Chip } from "@nextui-org/react";
import React from "react";

export const Status = ({ status }: { status: string }) => {
  if (status === "ON-QUEUE") {
    return (
      <Chip variant="shadow" color="secondary" size="sm">
        ON QUEUE
      </Chip>
    );
  }

  if (status === "PROCESSING") {
    return (
      <Chip variant="dot" color="warning" size="sm">
        PROCESSING
      </Chip>
    );
  }

  return (
    <Chip variant="dot" color="success">
      DONE
    </Chip>
  );
};
