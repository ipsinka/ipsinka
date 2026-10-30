import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Navbar.module.scss";

jest.mock("next/navigation", () => ({ usePathname: jest.fn() }));
jest.mock("next-themes", () => ({ useTheme: () => ({ theme: "light", setTheme: jest.fn() }) }));

// jsdom no implementa AnimationEvent.animationName: se fija a mano.
const terminarAnimacion = (el, nombre) => {
  const evento = createEvent.animationEnd(el);
  Object.defineProperty(evento, "animationName", { value: nombre });
  fireEvent(el, evento);
};

beforeEach(() => {
  usePathname.mockReturnValue("/servicios");
  window.scrollTo = jest.fn();
});

describe("logo del navbar", () => {
  const logo = () => screen.getByRole("link", { name: "Ir al inicio" });

  it("enlaza a la página de inicio", () => {
    render(<Navbar />);
    expect(logo()).toHaveAttribute("href", "/");
  });

  it("ya no abre el logo ampliado al pasar el cursor", () => {
    render(<Navbar />);
    fireEvent.mouseEnter(logo());
    expect(screen.getAllByRole("img", { name: /logo ips inga/i })).toHaveLength(1);
  });

  it("al tocarlo rebota y la animación termina después del pulso", () => {
    render(<Navbar />);
    fireEvent.click(logo());
    expect(logo()).toHaveClass(styles.logoRebote);

    // Terminar los rebotes no quita la clase: falta el pulso.
    terminarAnimacion(logo(), "Navbar-module__hash__logoRebote");
    expect(logo()).toHaveClass(styles.logoRebote);

    terminarAnimacion(logo(), "Navbar-module__hash__logoPulso");
    expect(logo()).not.toHaveClass(styles.logoRebote);
  });

  it("si ya se está en el inicio, sube al principio de la página", () => {
    usePathname.mockReturnValue("/");
    render(<Navbar />);
    fireEvent.click(logo());
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("en otras páginas no fuerza el scroll (navega el Link)", () => {
    render(<Navbar />);
    fireEvent.click(logo());
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
