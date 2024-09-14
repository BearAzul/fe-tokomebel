import HeroSection from "../components/Hero/HeroSection.jsx";
import ServiceSection from "../components/Service/ServiceSection.jsx";
import CustomSection from "../components/Customize/CustomSection.jsx";
import RecentSection from "../components/Recent/RecentSection.jsx";
import BestSellerSection from "../components/Trending/BestSellerSection.jsx";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <BestSellerSection />
      <CustomSection />
      <RecentSection />
    </>
  );
};

export default HomePage;
