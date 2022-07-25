import * as React from "react";
import { createRoot } from "react-dom/client";
import { Root } from "@pages/root";
import "@styles/index.scss";

createRoot(document.getElementById("app") as Element).render(<Root />);
