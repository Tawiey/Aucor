import { testimonials } from '../data/testimonials';

const duplicatedTestimonials = [...testimonials, ...testimonials];

function getInitials(name) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

function TestimonialCard({ testimonial, animated = false }) {
    return (
        <article
            className={`relative overflow-hidden rounded-[1.65rem] border border-white/7 bg-[linear-gradient(145deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.14)] backdrop-blur-sm ${animated ? 'h-[18.75rem] w-full' : 'min-h-[16.5rem] w-full'}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,46,45,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.022),transparent_38%)]" />

            <div className="relative flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-accent/88">
                        Client voice
                    </span>
                    <span className="text-3xl font-semibold leading-none tracking-[-0.06em] text-white/8">
                        ”
                    </span>
                </div>

                <blockquote
                    className="text-[0.95rem] font-medium leading-[1.55] tracking-[-0.012em] text-ivory/92"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 7,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {testimonial.quote}
                </blockquote>

                <div className="mt-auto flex items-center gap-3 border-t border-white/8 pt-4">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] text-xs font-semibold tracking-[0.08em] text-white/90">
                        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,46,45,0.16),transparent_58%)]" />
                        <span className="relative z-10">{getInitials(testimonial.name)}</span>
                    </div>

                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold tracking-tight text-white">
                            {testimonial.name}
                        </div>
                        <div className="mt-0.5 truncate text-[10px] uppercase tracking-[0.18em] text-white/46">
                            {testimonial.meta}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function Testimonials() {
    const leftLaneTestimonials = duplicatedTestimonials.filter((_, index) => index % 2 === 0);
    const rightLaneTestimonials = duplicatedTestimonials.filter((_, index) => index % 2 === 1);

    return (
        <section className="theme-bg theme-text px-6 py-24 md:px-16 md:py-28" id="testimonials">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-[minmax(16rem,0.56fr)_minmax(0,1.44fr)] lg:items-start lg:gap-10">
                    <div className="max-w-sm lg:sticky lg:top-28">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-widest theme-text-muted">
                                Testimonials
                            </span>
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight text-ivory md:text-5xl lg:text-[3.35rem]">
                            Confidence earned in the room.
                        </h2>

                        <p className="mt-5 max-w-sm text-base font-light leading-relaxed text-ivory/60 md:text-lg">
                            Feedback from clients who have sold through Aucor.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-24 bg-[linear-gradient(180deg,var(--bg-primary)_0%,rgba(13,13,18,0)_100%)] lg:block" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-20 bg-[linear-gradient(0deg,var(--bg-primary)_0%,rgba(13,13,18,0)_100%)] lg:block" />
                        <div className="pointer-events-none absolute inset-0 hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_78%_18%,rgba(230,46,45,0.1),transparent_22%),radial-gradient(circle_at_28%_72%,rgba(255,255,255,0.035),transparent_18%)] lg:block" />

                        <div className="grid gap-4 md:grid-cols-2 lg:hidden">
                            {testimonials.map((testimonial) => (
                                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                            ))}
                        </div>

                        <div className="testimonial-stream hidden h-[44rem] overflow-hidden lg:block">
                            <div className="grid h-full grid-cols-2 gap-5 pr-2">
                                <div className="testimonial-stream-lane">
                                    <div className="testimonial-stream-track flex flex-col gap-4">
                                        {leftLaneTestimonials.map((testimonial, index) => (
                                            <TestimonialCard
                                                key={`left-${testimonial.id}-${index}`}
                                                testimonial={testimonial}
                                                animated
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="testimonial-stream-lane pt-[9.375rem]">
                                    <div className="testimonial-stream-track flex flex-col gap-4">
                                        {rightLaneTestimonials.map((testimonial, index) => (
                                            <TestimonialCard
                                                key={`right-${testimonial.id}-${index}`}
                                                testimonial={testimonial}
                                                animated
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
