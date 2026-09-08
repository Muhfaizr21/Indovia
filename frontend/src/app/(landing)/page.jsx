import { useState } from 'react';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import HeroBanner from './components/HeroBanner';
import Collections from './components/Collections';
import BestSellers from './components/BestSellers';
import SaleEvent from './components/SaleEvent';
import Testimonials from './components/Testimonials';
import InstagramGallery from './components/InstagramGallery';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing-storefront bg-white text-dark">
      {/* 1. Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* 2. Top Header & Nav */}
      <Header
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* 3. Main Content Container */}
      <main className="main">
        {/* Hero Banner Slider */}
        <HeroBanner />

        {/* Categories / Shop by Collection */}
        <Collections />

        {/* Featured Products / Best Sellers */}
        <BestSellers />

        {/* Promotional Sale Event Banner */}
        <SaleEvent />

        {/* Testimonials */}
        <Testimonials />

        {/* Instagram Feed Grid */}
        <InstagramGallery />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* 4. Complete Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
