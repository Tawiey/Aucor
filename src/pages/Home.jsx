import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedProperties from '../components/FeaturedProperties';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import GetStarted from '../components/GetStarted';

export default function Home() {
    return (
        <>
            <Hero />
            <SearchBar />
            <FeaturedProperties />
            <Features />
            <Philosophy />
            <Protocol />
            <GetStarted />
        </>
    );
}
