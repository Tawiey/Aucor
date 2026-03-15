import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import GetStarted from '../components/GetStarted';
import FAQSection from '../components/FAQSection';

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedProperties />
            <Features />
            <Philosophy />
            <Protocol />
            <GetStarted />
            <FAQSection />
        </>
    );
}
