/** @format */

import theme1 from "./Theme1";
import theme2 from "./Theme2";
import theme3 from "./Theme3";
import type { ThemeType, Theme } from "../types";

const themes = {
  theme1,
  theme2,
  theme3,
} satisfies Record<ThemeType, Theme>;


export default themes;