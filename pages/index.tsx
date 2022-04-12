import type { NextPage } from 'next';
import Image from 'next/image';
import HomeCover from '../components/HomeCover';
import ScrollIndicator from '../components/ScrollIndicator';
import Footer from '../components/Footer';
import AnimatedParagraph from '../components/AnimatedParagraph';

const Home: NextPage = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <HomeCover />
        <ScrollIndicator />
      </div>
      <section className="section about-image">
        <div className="image">
          <Image src={'/images/home2.jpeg'} objectFit="cover" layout="fill" />
          {/* <Image src={"/images/profile.jpeg"} objectFit="cover" layout="f	ill" /> */}
          {/* <Image src={"/images/home2.jpeg"} objectFit="cover" layout="fill" /> */}
        </div>
      </section>
      <section className="section about-text">
        <AnimatedParagraph />
      </section>

      {/* <section className="section">
                <h1>Projects</h1>

                <p>Placeholder for some sort of webgl based images/sliders/grid</p>
              </section> */}

      <Footer />
    </div>
  );
};

export default Home;
