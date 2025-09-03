

import React, { Suspense, lazy } from 'react';

const Header = lazy(() => import('../Header1'));
const NavigationBar = lazy(() => import('../navigationbar'));
const HeroBanner = lazy(() => import('../heroSection'));
const JewelryShowcase = lazy(() => import('../productShowcase.jsx'));
const JewelryCategories = lazy(() => import('../categoryShowcase.jsx'));
const WarrantyFeatures = lazy(() => import('../trustBadge.jsx'));
const ServiceShowcase = lazy(() => import('../serviceBar.jsx'));
const SonasutraCollections = lazy(() => import('../brandCollection.jsx'));
const BannerSlidder = lazy(() => import('../bannerSlidder.jsx'));
const ExclusiveDealsSection = lazy(() => import('../exclusiveDeal.jsx'));
const CaratLaneSignup = lazy(() => import('../emailSubscription.jsx'));
const Footer = lazy(() => import('../Footer1'));
const FloatingSupportMenu = lazy(() => import('./ClientDemo/Support.js'));

const Loader = () => <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;

const HomePage = () => {
    return (
        <div className='overflow-hidden'>
            {/* Main Header and Nav */}
            <Suspense fallback={<Loader />}>
                <Header />
                <NavigationBar />
                <HeroBanner />
            </Suspense>

            {/* Main Content */}
            <Suspense fallback={<Loader />}>
                <JewelryShowcase />
                <JewelryCategories />
                <WarrantyFeatures />
                <ServiceShowcase />
                <SonasutraCollections />
                <BannerSlidder />
                <ExclusiveDealsSection />
                <CaratLaneSignup />
            </Suspense>

            {/* Footer and Support */}
            <Suspense fallback={<Loader />}>
                <Footer />
                <FloatingSupportMenu />
            </Suspense>
        </div>
    );
};

export default HomePage;

