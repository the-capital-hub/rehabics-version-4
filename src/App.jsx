import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import HomePage from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Patients from "./pages/Patients/Patients";
import Contact from "./pages/Contact/Contact";
import Appointment from "./pages/Appointment/Appointment";
import AuthPage from "./pages/Auth/Auth";
import ServiceDetail from "./pages/Services/ServiceDetail";
import AIFloatingAssistant from "./components/AIFloatingButton/AIFloatingButton";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";


function App() {
  return (
    <>
    <ScrollToTop/>
      <Navbar />

      <main>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<Services />} />
        <Route
  path="/services/:slug"
  element={<ServiceDetail />}
/>
        <Route path="/patients" element={<Patients />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/login" element={<AuthPage />} />
<Route path="/signup" element={<AuthPage />} />
        

      </Routes>
        
        
        
      </main>
      <Footer/>
      <AIFloatingAssistant/>
      
    </>
  );
}

export default App;