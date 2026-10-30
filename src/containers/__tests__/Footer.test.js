import { render, screen } from "@testing-library/react";
import Footer from "@/containers/Footer";

describe("Footer", () => {
  it("muestra el correo institucional con enlace mailto", () => {
    render(<Footer />);
    const enlace = screen.getByRole("link", { name: "contacto@ipsinka.com" });
    expect(enlace).toHaveAttribute("href", "mailto:contacto@ipsinka.com");
  });

  it("ya no muestra el correo anterior de Gmail", () => {
    const { container } = render(<Footer />);
    expect(container.textContent).not.toMatch(/ipsingakamentsa@gmail\.com/);
  });
});
