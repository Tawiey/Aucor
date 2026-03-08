export default function Footer() {
    return (
        <footer className="bg-black/80 text-ivory pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] relative overflow-hidden border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col gap-16">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="md:col-span-2 flex flex-col items-start gap-4">
                        <img src="/logo.png" alt="Aucor Properties" className="h-8 md:h-10 w-auto mb-2 mix-blend-screen opacity-90" />
                        <p className="text-ivory/50 font-light max-w-xs text-sm leading-relaxed">
                            Precision longevity in property investment. The leading marketplace for competitive discovery.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-ivory/80">Platform</h4>
                        <a href="#" className="text-ivory/50 hover:text-accent transition-colors text-sm w-max">Active Auctions</a>
                        <a href="#" className="text-ivory/50 hover:text-accent transition-colors text-sm w-max">Marketplace</a>
                        <a href="#" className="text-ivory/50 hover:text-accent transition-colors text-sm w-max">Sell Property</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-ivory/80">Entity</h4>
                        <a href="#" className="text-ivory/50 hover:text-accent transition-colors text-sm w-max">About Us</a>
                        <a href="#" className="text-ivory/50 hover:text-accent transition-colors text-sm w-max">Contact</a>
                        <a href="#" className="text-ivory/50 hover:text-accent transition-colors text-sm w-max">Legal</a>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-ivory/40 text-xs font-mono">
                        &copy; {new Date().getFullYear()} Aucor Properties. All rights reserved.
                    </p>

                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span className="font-mono text-[10px] text-ivory/70 font-semibold tracking-widest uppercase">
                            System Operational
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
