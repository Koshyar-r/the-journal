
import RecentPosts from "@/components/home/RecentPosts";
import PostCardSkeleton from "@/components/skeletons/PostCardsSkeleton";
import ContainerLayout from "@/layouts/ContainerLayout";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  return (
    <ContainerLayout>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden py-16 lg:py-24">
        {/* Background details */}
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="relative z-10 w-full">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-primary">
              About The Journal
            </span>
          </div>

          <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl xl:text-9xl">
            Stories for
            <br />
            <span className="text-white/40">Curious Minds.</span>
          </h1>

          <div className="mt-10 flex max-w-xl items-center justify-between border-t border-white/10 pt-6">
            <p className="text-sm leading-6 text-white/40">
              Ideas, stories, and perspectives worth exploring — thoughtful pieces that spark curiosity, challenge the way you think, and leave you with something new to take away.
            </p>

            <div className="hidden text-4xl font-light text-white/10 sm:block">
              01
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-white/10 py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-24">
          {/* Image */}
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border border-primary/20" />

            <div className="relative overflow-hidden rounded-3xl bg-secondary-background">
              <Image
                src="/images/about.png"
                alt="about-image"
                width={600}
                height={600}
                className="w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>

            <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-primary shadow-[0_0_30px_rgba(36,107,206,0.7)]" />
          </div>

          {/* Contents */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                About The Journal
              </span>
              <span className="h-px w-10 bg-primary/40" />
            </div>

            <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Simple Ways to Unlock Your Creativity
            </h3>

            <p className="mt-7 text-base leading-8 text-white/50 lg:text-lg">
              Creativity isn't something reserved for artists or writers.
              Sometimes, all it takes is a change of perspective, a new
              experience, or a little space to think. Here are a few simple
              ways to spark fresh ideas and bring more creativity into your
              everyday life.
            </p>

            <div className="mt-9">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-transparent"
              >
                Learn More
                <LuArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Latest
            </span>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white lg:text-5xl">
              Recent Posts
            </h2>
          </div>

          <span className="hidden text-6xl font-bold tracking-[-0.05em] text-white/5 sm:block">
            02
          </span>
        </div>

        <Suspense fallback={<PostCardSkeleton />}>
          <RecentPosts />
        </Suspense>
      </section>
    </ContainerLayout>
  );
}