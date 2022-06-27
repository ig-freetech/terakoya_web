import * as React from "react";
import { createRoot } from "react-dom/client";
import { Form } from "@pages/attendance/reservation";
import "@styles/index.scss";

createRoot(document.getElementById("app") as Element).render(<Form />);
