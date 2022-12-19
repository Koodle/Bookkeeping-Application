//add bootstrap css
// import 'bootstrap/dist/css/bootstrap.css'
//add custom css

// These styles apply to every route in the application
import "../styles/globals.css";

//components
import SideBar from "../components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      {/* <SideBar /> */}
      <body>{children}</body>
    </html>
  );
}
