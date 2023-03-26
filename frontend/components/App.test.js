// Write your tests here
import React from "react";
import AppFunctional from "./AppFunctional";
import { render, screen , } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test('sanity', () => {
  expect(true).toBe(true)
})



test("hatasız render et", () => {
  render(<AppFunctional />);
});

test("ekranda koordinat başlığını render et", () => {
  render(<AppFunctional />)
  const heading = screen.getByText("Koordinatlar (2,2)");
  expect(heading).toBeVisible();
  expect(heading).toBeInTheDocument();
  
});

test("sıfırlama düğmesi ekranda görünür", () => {
  render(<AppFunctional />)
 
  const resetBtn = screen.getByText("reset");
  expect(resetBtn).toBeVisible();
  expect(resetBtn).toBeInTheDocument();
});


test("submit butonunu render et", () => {
  render(<AppFunctional />)

  const submitBtn = screen.getByTestId("submit");
  expect(submitBtn).toBeVisible();
  expect(submitBtn).toBeInTheDocument();

});