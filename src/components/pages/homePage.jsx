// import React from 'react'
// import Header from '../Header1'
// import NavigationBar from '../navigationbar'
// import HeroBanner from '../heroSection'

// import Footer from '../Footer1'
// import JewelryShowcase from '../productShowcase.jsx'
// import JewelryCategories from '../categoryShowcase.jsx'
// import WarrantyFeatures from '../trustBadge.jsx'
// import ServiceShowcase from '../serviceBar.jsx'
// import SonasutraCollections from '../brandCollection.jsx'
// import BannerSlidder from '../bannerSlidder.jsx'
// import ExclusiveDealsSection from '../exclusiveDeal.jsx'
// import CaratLaneSignup from '../emailSubscription.jsx'
// import FloatingSupportMenu from './ClientDemo/Support.js'
// // import JoinInsider from '../emailSubscription.jsx'
// // import SonasutraSignup from '../emailSubscription.jsx'

// const HomePage = () => {
//     return (
//         <div className='overflow-hidden'>
//             <Header/>
//             <NavigationBar/>
//             <HeroBanner/>
//             <JewelryShowcase/>
//             <JewelryCategories/>
//             <WarrantyFeatures/>
//             <ServiceShowcase/>
//             <SonasutraCollections/>
//             <BannerSlidder/>
//             <ExclusiveDealsSection/>
//             {/* <SonasutraSignup/> */}
//             {/* <JoinInsider/> */}
//             <CaratLaneSignup/>
//             <Footer/>
//             <FloatingSupportMenu/>
//         </div>
//     )
// }

// export default HomePage

import React, { Suspense, lazy } from 'react';

// Lazy-loaded components
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

// Optional: Create a simple loader (you can replace this with a spinner or skeleton loader)
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

