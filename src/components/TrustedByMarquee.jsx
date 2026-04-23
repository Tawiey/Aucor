import { clientLogos } from '../data/clientLogos';

const duplicatedLogos = [...clientLogos, ...clientLogos];

export default function TrustedByMarquee() {
    return (
        <div className="hero-reveal relative left-1/2 mt-8 w-screen -translate-x-1/2 pt-4 md:mt-10 md:pt-6">
            <div className="flex flex-col items-center text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/58 md:text-[15px]">
                    Trusted by
                </span>
            </div>

            <div className="trusted-marquee mt-7 md:mt-8">
                <div className="trusted-marquee-track">
                    {duplicatedLogos.map((logo, index) => (
                        <div
                            key={`${logo.alt}-${index}`}
                            className="flex h-[5.25rem] min-w-[10.5rem] flex-none items-center justify-center px-7 py-4 md:h-[5.75rem] md:min-w-[12.5rem] md:px-8"
                            aria-hidden={index >= clientLogos.length}
                        >
                            <img
                                src={logo.src}
                                alt={index >= clientLogos.length ? '' : logo.alt}
                                className="max-h-10 w-auto max-w-[8.75rem] object-contain opacity-70 transition-opacity duration-300 hover:opacity-88 md:max-h-11 md:max-w-[9.75rem]"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
