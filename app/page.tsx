import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import StatsSection from '@/components/StatsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PackagesSection from '@/components/PackagesSection';
import CtaBannerSection from '@/components/CtaBannerSection';
import TestimonialsContactsSection from '@/components/TestimonialsContactsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <StatsSection />
      <PackagesSection />
      <HowItWorksSection />
      <CtaBannerSection />
      <TestimonialsContactsSection />
    </>
  );
}
