import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import StackSection from "@/components/StackSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import FadeSection from "@/components/FadeSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="max-w-[722px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="pt-14">
          <FadeSection><HeroSection /></FadeSection>
          <FadeSection><AboutSection /></FadeSection>
          <FadeSection><ExperienceSection /></FadeSection>
          <FadeSection><EducationSection /></FadeSection>
          <FadeSection><StackSection /></FadeSection>
          <FadeSection><AwardsSection /></FadeSection>
          <FadeSection><ContactSection /></FadeSection>
        </div>
      </main>
    </div>
  );
};

export default Index;
