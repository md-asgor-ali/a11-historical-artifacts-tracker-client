import React from 'react';
import Slider from './Slider';
import FeaturedArtifacts from './FeaturedArtifacts';
import ExtraSection from './ExtraSection';
import ExtraSection2 from './ExtraSection2';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <ExtraSection></ExtraSection>
            <FeaturedArtifacts></FeaturedArtifacts>
            <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default Home;