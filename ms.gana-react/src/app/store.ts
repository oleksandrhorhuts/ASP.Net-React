import { configureStore } from "@reduxjs/toolkit";

import TriggerSlice from "./TriggerSlice";
import RowPerPageSlice from "./RowPerPageSlice";

export default configureStore({
  reducer: {
    trigger: TriggerSlice,
    rowPerPage: RowPerPageSlice,
  }
});