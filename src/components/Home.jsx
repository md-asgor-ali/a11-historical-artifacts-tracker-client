import React from 'react';
import Slider from './Slider';
import FeaturedArtifacts from './FeaturedArtifacts';
import ExtraSection from './ExtraSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <ExtraSection></ExtraSection>
            <FeaturedArtifacts></FeaturedArtifacts>
        </div>
    );
};

export default Home;