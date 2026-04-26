import { useInView } from '../hooks/useAnimations.js'

export default function Philosophy() {
  const [ref, visible] = useInView()

  return (
    <div className="philosophy" ref={ref}>
      <div className={`philosophy__inner${visible ? ' philosophy__inner--in' : ''}`}>
        {/* Image */}
        <div className="philosophy__image-wrap">
          <div className="philosophy__image-shadow" aria-hidden="true" />
          <img
            className="paper-card philosophy__img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfR1434mG3iomj4pKMEeBOsWI0lzwiePtMt9s82o2i3ZV4Bevj9g3C0zflgobb0W5R4-EVS50eBnjrMnnDsTvoRZyI4I355srPa7HbHKRlDMC_xA4HAgnJayHmwN4do34l-Egt4fs-DsFdamfcx5O_8F6LFhgvH813nHZ2lb7dmgtNOoCmWgOwEk8T_7S22cVbgM7nDiOcSrwmj5nhxdFPfjmTgI6ILGlIx4OnFu-E18JbtzAfEiuqLrgMmgISKnqD5veaxP1WBw"
            alt="overhead shot of an open botanical journal with hand-drawn sketches"
          />
        </div>

        {/* Text */}
        <div className="philosophy__text">
          <p className="philosophy__label handwritten">Our Philosophy</p>

          <h2 className="philosophy__headline handwritten">
            Knowledge is static until it is lived. We facilitate the transition
            from reading to rooting.
          </h2>

          <p className="philosophy__body handwritten">
            Our collective focuses on three core domains of development. By
            curating the best practices from global archives, we provide a
            structured path for those seeking deeper meaning in their
            professional and personal lives.
          </p>

          {/* Animated underline flourish */}
          <div className="philosophy__flourish" aria-hidden="true">
            <svg viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 8 Q 50 2 100 8 T 198 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="philosophy__flourish-path"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
