import calligraphy from '../assets/images/pic3-calligraphy-rabbi-zidni-ilma.png';

/* Batch 16: the owner's "Rabbi zidni ilma" calligraphy picture in a
   gold-framed band below the Why Us area (home only). Duotone
   treatment is CSS-only (mockup technique): the picture blends
   luminosity over a gold→teal wash, so its warm orange reads as
   brand olive-gold / teal — the calligraphy itself is untouched.
   No new copy, no new colour. */
export default function CalligraphyBand() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mx-auto max-w-3xl rounded-[20px] border-[1.5px] border-[#7A7A50]/60 bg-white p-4 sm:p-5 shadow-[0_10px_30px_rgba(11,46,58,0.06)]">
          <div className="overflow-hidden rounded-[14px] bg-[linear-gradient(125deg,#7A7A50_0%,#004050_135%)]">
            <img
              src={calligraphy}
              alt="Arabic calligraphy: Rabbi zidni ilma — My Lord, increase me in knowledge"
              loading="lazy"
              decoding="async"
              width={612}
              height={306}
              className="h-auto w-full mix-blend-luminosity contrast-[1.07] brightness-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
