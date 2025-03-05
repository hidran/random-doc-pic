import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import DogImage from "./DogImage";
import { vi } from "vitest";

global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "https://dog.ceo/api/img/random.jpg" }),
    })
);

test("Mostra l'immagine dopo il caricamento", async () => {
  render(<DogImage />);

  // 1️⃣ Attendi e verifica che "Loading..." sia visibile inizialmente
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();
  });

  // 2️⃣ Attendi il caricamento dell'immagine
  await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());

  // 3️⃣ Verifica che "Loading..." non sia più nel DOM
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  // 4️⃣ Controlla che l'immagine abbia l'URL corretto
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "https://dog.ceo/api/img/random.jpg");
  expect(img).toHaveAttribute("alt", "Random Dog");
});
