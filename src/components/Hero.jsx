import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative pointer-events-none">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow">
            Gamma — Instant AI Summaries for Business & Legal Docs
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100/90">
            Upload. Summarize. Share. Accurate, private, and fast.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900" />
    </section>
  )
}

export default Hero
