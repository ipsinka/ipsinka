"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components";
import { Footer } from "@/containers";
import Image from "next/image";

export default function AdminLayoutGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Patrón de marcas de agua — solo en páginas públicas */}
      <div className="watermark-pattern flex justify-center items-center">
        <Image
          src="https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/marca_agua.jpeg"
          alt=""
          className="watermark"
          aria-hidden="true"
          width={400}
          height={400}
        />
        <Image
          src="https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/marca_agua.jpeg"
          alt=""
          className="watermark"
          aria-hidden="true"
          width={400}
          height={400}
        />
      </div>
      <div className="watermark-container relative flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
