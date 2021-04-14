import Footer from "../initials/Footer"
import Navbar from "../initials/Navbar"
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css'
import PropertyProvider from "../contexts/PropertyContext"
import {AuthProvider} from "../contexts/AuthContext"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PropertyProvider>
        <AuthProvider>
          <Navbar />
            <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </PropertyProvider>
    </>
  );
}

export default MyApp
