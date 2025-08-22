import "./globals.css";
import { StoreProvider } from "./store/store";

export const metadata = {
  title: "Finance Tracker App",
  description: "Aplikasi pelacak keuangan sederhana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-100">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
