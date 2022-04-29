import { memo, useCallback } from "react";
import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { joinStyleClass } from "@libs/client/utils";
import { setIsStatusChanging } from "@store/reducer/workTime";
import { AnimatePresence, motion } from "framer-motion";

interface props {
  onClickTimerButton: () => void;
  isLoading: boolean;
}

const StatusButton: NextPage<props> = ({ isLoading, onClickTimerButton }) => {
  const dispatch = useAppDispatch();
  const timerStatus = useAppSelector((state) => state.workTime.timerStatus);

  const setIsStatusChangingHandler = useCallback(
    (status: boolean) => {
      dispatch(setIsStatusChanging(status));
    },
    [dispatch]
  );

  return (
    <button
      disabled={isLoading}
      onClick={onClickTimerButton}
      className={joinStyleClass(
        "relative w-36 aspect-square text-green-50 font-medium text-2xl bg-green-700 rounded-full scale",
        isLoading ? "pointer-events-none opacity-50" : ""
      )}
    >
      <AnimatePresence
        initial={false}
        onExitComplete={() => setIsStatusChangingHandler(false)}
      >
        <motion.span
          className="flex items-center justify-center absolute inset-0"
          key={timerStatus}
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: 50, opacity: 0 }}
          transition={{ type: "tween" }}
        >
          {timerStatus}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default memo(StatusButton);
