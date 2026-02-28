import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { ChevronLeft } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative">
      <img
        src="/footer/Top%20Bar.png"
        alt="top line"
        className="w-full h-[14px] object-cover"
      />

      <div className="relative bg-[#0D0B26] text-white overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[90px] opacity-[0.3]"
          style={{
            backgroundImage: "url('/footer/Vector%2012.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "200px 90px",
            backgroundPosition: "bottom left",
          }}
        />

        <div className="mx-auto w-full max-w-[1400px] px-6 py-14 relative z-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-5">
              <FooterTitle>تواصل معنا</FooterTitle>

              <div className="space-y-4 text-[15px] text-white/90">
                <div className="flex items-start gap-3 cursor-pointer hover:text-white">
                  <span className="mt-1 text-[#D75B19]">
                    <FaMapMarkerAlt />
                  </span>
                  <p>محافظات مصر</p>
                </div>

                <div className="flex items-start gap-3 cursor-pointer hover:text-white">
                  <span className="mt-1 text-[#D75B19]">
                    <FaEnvelope />
                  </span>
                  <p className="break-all">Lamarco@Lamaroyc.Us</p>
                </div>

                <div className="flex items-start gap-3 cursor-pointer hover:text-white">
                  <span className="mt-1 text-[#D75B19]">
                    <FaPhoneAlt />
                  </span>
                  <p dir="ltr">+20 555-444-658</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <FooterTitle>مدونة</FooterTitle>

              <ul className="space-y-5 text-[14px] text-white/85">
                <li className="leading-relaxed">
                  <FooterBlogLink href="#">
                    كيف تتمكن من اختيار الحرفي المناسب لك
                  </FooterBlogLink>
                  <div className="mt-1 text-xs text-white/55">
                    <span dir="ltr" className="inline-block">
                      8 Nov, 2021
                    </span>
                  </div>
                </li>

                <li className="leading-relaxed">
                  <FooterBlogLink href="#">
                    طرق التعامل مع الحرفيين من خلال منصتنا
                  </FooterBlogLink>
                  <div className="mt-1 text-xs text-white/55">
                    <span dir="ltr" className="inline-block">
                      8 Nov, 2021
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <FooterTitle>روابط سريعة</FooterTitle>

              <ul className="space-y-2 text-[14px] text-white/85">
                <FooterLink href="/">الرئيسية</FooterLink>
                <FooterLink href="/services">الخدمات</FooterLink>
                <FooterLink href="/about">أعمالنا</FooterLink>
                <FooterLink href="/how">من نحن</FooterLink>
                <FooterLink href="/contact">تواصل معنا</FooterLink>
              </ul>
            </div>

            <div className="space-y-5">
              <FooterTitle>وسائل التواصل</FooterTitle>

              <div className="flex items-center gap-5">
                <SocialIcon href="#" iconClassName="text-[#FF0000]">
                  <FaYoutube />
                </SocialIcon>

                <SocialIcon href="#" iconClassName="text-[#0D0B26]">
                  <FaFacebookF />
                </SocialIcon>
              </div>
            </div>
          </div>

          <div className="h-[70px]" />
        </div>

        <div className="absolute bottom-[28px] left-0 w-full text-center text-xs text-white/70 z-20">
          © جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }) {
  return (
    <div className="inline-block">
      <h4 className="text-[16px] font-extrabold">{children}</h4>
      <span
        className="mt-2 block h-[8px] w-[90px] bg-no-repeat bg-contain"
        style={{ backgroundImage: "url('/footer/underline.png')" }}
      />
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="
          group inline-flex items-center gap-2
          text-white/85 hover:text-white
          transition-all duration-300
          hover:-translate-x-1
        "
      >
        <ChevronLeft className="h-4 w-4 text-[#D75B19]" />
        <span>{children}</span>
      </a>
    </li>
  );
}

function FooterBlogLink({ href, children }) {
  return (
    <a
      href={href}
      className="
        group inline-flex items-start gap-2
        text-white/85 hover:text-white
        transition-all duration-300
        hover:-translate-x-1
      "
    >
      <ChevronLeft className="mt-[3px] h-4 w-4 text-[#D75B19] shrink-0" />
      <span className="leading-relaxed">{children}</span>
    </a>
  );
}

function SocialIcon({ href, children, iconClassName = "text-[#0D0B26]" }) {
  return (
    <a
      href={href}
      className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm hover:scale-105 transition"
      aria-label="social"
    >
      <span className={iconClassName}>{children}</span>
    </a>
  );
}
