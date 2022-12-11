import * as Popover from "@radix-ui/react-popover";
import { useDispatch } from "react-redux";
import { setHoverCard } from "../../redux/sidenavSlice";
const PopOverBase = ({ trigger, content, open, setOpen }) => {
  const dispatch = useDispatch();

  return (
    <Popover.Root
      onOpenChange={(e) => {
        dispatch(setHoverCard(e));
        setOpen(e);
      }}
      openDelay={0}
      closeDelay={100}
      open={open}
    >
      <Popover.Trigger>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-md p-2 bg-white shadow-md z-[100]"
          sideOffset={5}
        >
          {content}

          <Popover.Arrow width={15} height={9} className=" fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopOverBase;
