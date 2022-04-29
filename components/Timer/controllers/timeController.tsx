import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@libs/client/useRedux";
import { getCurDateInClient, getHourMinuteSecond } from "@libs/client/utils";
import { format } from "date-fns";
import { getCurDate } from "@libs/server/utils";

const useTimeController = () => {
  const interval = useRef<NodeJS.Timer[]>([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [hourTrigger, setHourTrigger] = useState(0);
  const [minuteTrigger, setMinuteTrigger] = useState(0);
  const timerStatus = useAppSelector((state) => state.workTime.timerStatus);
  const startTime = useAppSelector((state) => state.workTime.startTime?.start);

  useEffect(() => {
    if (timerStatus === "end" && startTime) {
      const startDate = getCurDateInClient(startTime);
      if (!isNaN(startDate.getTime())) {
        const [h, m, s] = getDistanceTime(startDate);
        setHour(h);
        setMinute(m);
        setSecond(s);
      }
    }
  }, [timerStatus, startTime]);

  useEffect(() => {
    if (timerStatus === "start") {
      setHour(0);
      setMinute(0);
      setSecond(0);
    }
  }, [timerStatus]);

  useEffect(() => {
    if (timerStatus === "end") {
      const timer = setInterval(() => {
        setSecond((pre) => {
          if (pre < 59) {
            return pre + 1;
          } else {
            setMinuteTrigger((pre) => pre + 1);
            return 0;
          }
        });
      }, 1000);

      interval.current.push(timer);
    }

    const current = interval.current;
    return () =>
      current.forEach((timer) => {
        clearInterval(timer);
      });
  }, [timerStatus, setSecond]);

  useEffect(() => {
    if (minuteTrigger) {
      setMinute((pre) => {
        if (pre < 59) {
          return pre + 1;
        } else {
          setHourTrigger((pre) => pre + 1);
          return 0;
        }
      });
    }
  }, [minuteTrigger, setMinute]);

  useEffect(() => {
    if (hourTrigger) {
      setHour((pre) => pre + 1);
    }
  }, [hourTrigger, setHour]);

  return [hour, minute, second];
};

export default useTimeController;

function getDistanceTime(startTime: Date) {
  const duration = new Date().getTime() - startTime.getTime();
  const [h, m, s] = getHourMinuteSecond(duration);

  return [+h, +m, +s];
}
