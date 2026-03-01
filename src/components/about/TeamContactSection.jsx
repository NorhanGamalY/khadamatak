function SocialIcon({ src, alt }) {
  return (
    <a
      href="#"
      aria-label={alt}
      className="transition duration-300 hover:scale-110"
    >
      <img src={src} alt={alt} className="h-10 w-10 object-contain" />
    </a>
  );
}

function TeamCard({ name, imageSrc, social = [] }) {
  return (
    <div className="group w-full overflow-hidden rounded-2xl bg-[#D9D9D9] transition duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
      
      <div className="relative flex items-center justify-center h-[280px] sm:h-[320px] px-6 pt-8 overflow-hidden">
        
        <img
          src={imageSrc}
          alt={name}
          className="max-h-[240px] sm:max-h-[290px] object-contain transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

        <div className="absolute left-1/2 -translate-x-1/2 bottom-[30px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex items-center gap-3">
            {social.map((s, idx) => (
              <SocialIcon key={idx} src={s.src} alt={s.alt} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#D9D9D9] py-4 text-center transition duration-300 group-hover:bg-[#E5E5E5]">
        <p className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">
          {name}
        </p>
      </div>
    </div>
  );
}

export default function TeamContactSection() {
  const team = [
    {
      name: "مريم محمد",
      imageSrc: "about/team 3.png",
      social: [
        { src: "about/icons/facebook.png", alt: "Facebook" },
        { src: "about/icons/twitter.png", alt: "Twitter" },
        { src: "about/icons/pinterest.png", alt: "Pinterest" },
        { src: "about/icons/instagram.png", alt: "Instagram" },
      ],
    },
    {
      name: "بلال عمرو",
      imageSrc: "about/team 2.png",
      social: [
        { src: "about/icons/facebook.png", alt: "Facebook" },
        { src: "about/icons/twitter.png", alt: "Twitter" },
        { src: "about/icons/pinterest.png", alt: "Pinterest" },
        { src: "about/icons/instagram.png", alt: "Instagram" },
      ],
    },
    {
      name: "سيف علي",
      imageSrc: "about/team 1.png",
      social: [
        { src: "about/icons/facebook.png", alt: "Facebook" },
        { src: "about/icons/twitter.png", alt: "Twitter" },
        { src: "about/icons/pinterest.png", alt: "Pinterest" },
        { src: "about/icons/instagram.png", alt: "Instagram" },
      ],
    },
  ];

  return (
    <section dir="rtl" className="w-full py-14">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-center text-3xl font-bold text-[#1A1A1A] mb-12">
          تواصل مع الفريق
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {team.map((m, idx) => (
            <div key={idx} className="flex-1">
              <TeamCard
                name={m.name}
                imageSrc={m.imageSrc}
                social={m.social}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}