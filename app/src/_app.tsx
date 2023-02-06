import * as React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "@pages/index";
import "@styles/index.scss";

createRoot(document.getElementById("app") as Element).render(<Home />);
