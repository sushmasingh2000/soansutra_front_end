import React from 'react'
import Header from '../Header1'
import NavigationBar from '../navigationbar'
import HeroBanner from '../heroSection'

import Footer from '../Footer1'
import JewelryShowcase from '../productShowcase.jsx'
import JewelryCategories from '../categoryShowcase.jsx'
import WarrantyFeatures from '../trustBadge.jsx'
import ServiceShowcase from '../serviceBar.jsx'
import SonasutraCollections from '../brandCollection.jsx'
import BannerSlidder from '../bannerSlidder.jsx'
import ExclusiveDealsSection from '../exclusiveDeal.jsx'
import CaratLaneSignup from '../emailSubscription.jsx'
// import JoinInsider from '../emailSubscription.jsx'
// import SonasutraSignup from '../emailSubscription.jsx'

const HomePage = () => {
    return (
        <>
            <Header/>
            <NavigationBar/>
            <HeroBanner/>
            <JewelryShowcase/>
            <JewelryCategories/>
            <WarrantyFeatures/>
            <ServiceShowcase/>
            <SonasutraCollections/>
            <BannerSlidder/>
            <ExclusiveDealsSection/>
            {/* <SonasutraSignup/> */}
            {/* <JoinInsider/> */}
            <CaratLaneSignup/>
            <Footer/>
        </>
    )
}

export default HomePage
