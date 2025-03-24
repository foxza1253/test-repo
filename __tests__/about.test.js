import React from "react";  // ✅ เพิ่มบรรทัดนี้       F
import { render, screen } from "@testing-library/react";
// import About from "../pages/about";
import About from "../app/about/page";

test("renders About Page", () => {
  render(<About />);
  expect(screen.getByText("About")).toBeInTheDocument();
});
