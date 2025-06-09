import HeroSection from "../components/Hero/HeroSection.jsx";
import ServiceSection from "../components/Service/ServiceSection.jsx";
import CustomSection from "../components/Customize/CustomSection.jsx";
import RecentSection from "../components/Recent/RecentSection.jsx";
import BestSellerSection from "../components/Trending/BestSellerSection.jsx";
import { HelmetHead } from "../common/Helmet.jsx";

const HomePage = () => {
  return (
    <>
      <HelmetHead />
      <HeroSection />
      <ServiceSection />
      <BestSellerSection />
      <CustomSection />
      <RecentSection />
    </>
  );
};

export default HomePage;
