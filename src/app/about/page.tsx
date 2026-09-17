import ContainerLayout from "@/layouts/ContainerLayout";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <ContainerLayout>
            <div className="px-4 py-12 sm:px-12 lg:py-20">
                {/* Heading */}
                <div className="relative mb-20 overflow-hidden border-b border-white/10 pb-16 lg:mb-28 lg:pb-24">
                    <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

                    <div className="relative">
                        <div className="mb-6 flex items-center justify-center gap-4">
                            <span className="h-px w-10 bg-primary" />

                            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                                About The Journal
                            </span>

                            <span className="h-px w-10 bg-primary" />
                        </div>

                        <h1 className="text-center text-5xl font-bold leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
                            About
                            <br />
                            <span className="text-white/30">The Journal.</span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-2xl text-center leading-7 text-white/50">
                            A modern space for real-world ideas, thoughtful writing, and
                            creative perspectives.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-24 lg:space-y-32">
                    {/* Why The Journal */}
                    <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
                        <div className="relative">
                            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] border border-primary/20" />

                            <div className="relative overflow-hidden rounded-[2rem] bg-secondary-background">
                                <Image
                                    src="/images/aboutt.png"
                                    alt="about-image"
                                    width={600}
                                    height={600}
                                    className="w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                                />
                            </div>

                            <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-primary shadow-[0_0_30px_rgba(36,107,206,0.7)]" />
                        </div>

                        <div className="max-w-xl">
                            <div className="mb-5 flex items-center gap-4">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                    01
                                </span>

                                <span className="h-px w-12 bg-white/10" />
                            </div>

                            <h2 className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                                Why The Journal?
                            </h2>

                            <p className="leading-8 text-white/50 lg:text-lg">
                                The Journal is a space for ideas worth exploring — from technology and creativity to the things we encounter, question, and learn along the way. Thoughtful stories, practical insights, and perspectives that leave you with something new to think about.
                            </p>
                        </div>
                    </section>

                    {/* Built for Developers */}
                    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-secondary-background px-6 py-16 text-center sm:px-12 lg:px-20 lg:py-24">
                        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

                        <div className="relative">
                            <div className="mb-5 flex items-center justify-center gap-4">
                                <span className="h-px w-10 bg-primary/50" />

                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                    02
                                </span>

                                <span className="h-px w-10 bg-primary/50" />
                            </div>

                            <h2 className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                                Made for Curious Minds
                            </h2>

                            <p className="mx-auto mb-9 max-w-2xl leading-8 text-white/50 lg:text-lg">
                                Whether you're here to learn something new, find a fresh perspective, or simply follow your curiosity, The Journal is a place to pause, explore, and discover.
                            </p>

                            <Link
                                href="/articles"
                                className="inline-flex items-center justify-center rounded-full border border-primary bg-primary px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-transparent"
                            >
                                Explore
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </ContainerLayout>
    );
}