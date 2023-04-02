import { atom } from "recoil";
import { getNewDateObj } from "../utils/getNewDateObj";

export const SelectedDayState = atom({
    key: "selectedDay",
    default: getNewDateObj(new Date()),
});
