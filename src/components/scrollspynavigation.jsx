
import React, { useEffect, useState } from "react";

const ScrollSpyNavigation = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sections = [
    { id: 'customise', label: 'CUSTOMISE' },
    { id: 'delivery-stores', label: 'DELIVERY' },
    { id: 'details', label: 'DETAILS' },
    { id: 'reviews', label: 'REVIEWS' }
  ];

  useEffect(() => {
    // Detect mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = 64;
      const reviewsSection = document.getElementById('reviews');

      // Show after scrolling past initial content
      if (isMobile) {
        setIsVisible(scrollPosition > 200);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const sectionElements = sections
        .map(section => ({
          id: section.id,
          element: document.getElementById(section.id)
        }))
        .filter(item => item.element);

      let currentSection = null;

      // Check if scrolled past reviews section
      if (reviewsSection) {
        const reviewsBottom = reviewsSection.offsetTop + reviewsSection.offsetHeight - headerHeight - 48;
        if (scrollPosition > reviewsBottom) {
          setActiveSection(null);
          return;
        }
      }

      // Set active section, default to customise when nav is visible and no other section is active
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        const sectionTop = section.element.offsetTop - headerHeight - 48;
        if (scrollPosition >= sectionTop) {
          currentSection = section.id;
          break;
        }
      }

      setActiveSection(isVisible && !currentSection ? 'customise' : currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const navHeight = 48;
      const elementPosition = element.offsetTop - headerHeight - navHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Only render in mobile view
  if (!isMobile) return null;

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } md:hidden`}
    >
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center h-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex-1 py-2 px-1 text-xs font-medium text-center transition-colors duration-200 relative ${
                activeSection === section.id
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSpyNavigation;