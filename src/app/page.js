import BrowseDressStyle from "@/components/Home/DressStyle";
import HeroSection from "@/components/Home/HeroSection";
import NewArrivals from "@/components/Home/NewArrivals";
import ReviewsSlider from "@/components/Home/Reviews";
import TopSellers from "@/components/Home/TopSellers";
import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar";

export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <NewArrivals/>
    <TopSellers/>
    <ReviewsSlider/>
    <BrowseDressStyle/>
    <Footer/>
    </>
  );
}
