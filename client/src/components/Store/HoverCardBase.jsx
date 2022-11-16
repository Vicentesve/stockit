import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { useDispatch } from "react-redux";
import { setHoverCard } from "../../redux/sidenavSlice";

const HoverCardBase = ({ trigger, content }) => {
  const dispatch = useDispatch();

  return (
    <HoverCard.Root
      onOpenChange={(e) => dispatch(setHoverCard(e))}
      openDelay={100}
      closeDelay={100}
    >
      <HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>

      {/* Content */}
      <HoverCard.Portal>
        <HoverCard.Content
          className="rounded-md p-2 bg-white shadow-md z-[100]"
          sideOffset={5}
        >
          {content}
          <HoverCard.Arrow width={15} height={9} className=" fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverCardBase;
