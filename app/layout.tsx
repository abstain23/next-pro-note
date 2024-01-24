import { ReactNode } from "react";
import "./style.css";
import Sidebar from "@/components/Sidebar";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
