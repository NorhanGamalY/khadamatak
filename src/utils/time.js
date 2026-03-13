import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ar";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("ar");

export const formatTime = (date) => {
  if (!date) return "";

  const normalized = typeof date === "string" && !date.endsWith("Z")
    ? date + "Z"
    : date;

  return dayjs(normalized).fromNow();
};