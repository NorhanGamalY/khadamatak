import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MessageSquareText,
  Wrench,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";


function FieldLabel({ icon: Icon, children, className = "" }) {
  return (
    <label
      className={
        "mb-2 flex min-h-[44px] items-center gap-2 font-semibold text-[#1E1B4B] " +
        className
      }
    >
      {Icon && <Icon size={18} className="text-[#1E1B4B]" />}
      <span className="leading-tight">{children}</span>
    </label>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-lg border border-[#D9D9D9] bg-white px-4 py-3 text-[#1E1B4B] outline-none transition " +
        "focus:border-[#C56A2D] focus:ring-4 focus:ring-[#C56A2D]/15 " +
        "placeholder:text-[#9CA3AF] " +
        className
      }
    />
  );
}

function TextArea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={
        "w-full resize-none rounded-lg border border-[#D9D9D9] bg-white px-4 py-3 text-[#1E1B4B] outline-none transition " +
        "focus:border-[#C56A2D] focus:ring-4 focus:ring-[#C56A2D]/15 " +
        "placeholder:text-[#9CA3AF] " +
        className
      }
    />
  );
}

function SelectInput({ children, className = "", ...props }) {
  return (
    <div className={"relative " + className}>
      <select
        {...props}
        className={
          "w-full appearance-none rounded-lg border border-[#D9D9D9] bg-white px-4 py-3 text-[#1E1B4B] outline-none transition " +
          "focus:border-[#C56A2D] focus:ring-4 focus:ring-[#C56A2D]/15 " +
          className
        }
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
      />
    </div>
  );
}

function PhoneCountryField({
  phone,
  onPhoneChange,
  countryKey,
  onCountryChange,
  countries,
  loading,
  error,
  selectedCountry,
}) {
  const hasError = Boolean(error);

  return (
    <div
      className={
        "flex h-[50px] w-full items-stretch overflow-hidden rounded-xl border bg-white transition " +
        (hasError ? "border-red-500" : "border-[#D9D9D9]") +
        " focus-within:border-[#C56A2D] focus-within:ring-4 focus-within:ring-[#C56A2D]/15"
      }
    >
      <input
        dir="ltr"
        inputMode="numeric"
        value={phone}
        onChange={onPhoneChange}
        className="flex-1 bg-transparent px-4 text-[15px] text-[#1E1B4B] outline-none placeholder:text-[#9CA3AF]"
      />

      <div className="relative flex w-[150px] items-center gap-2 px-4 text-[15px] text-[#1E1B4B]">
        <ChevronDown className="absolute left-3 h-4 w-4 text-[#6B7280]" />

        <div className="flex min-w-0 items-center gap-2 pl-6">
          {selectedCountry?.flag ? (
            <img
              src={selectedCountry.flag}
              alt=""
              className="h-4 w-6 rounded-sm object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-4 w-6 rounded-sm bg-gray-200" />
          )}

          <span className="truncate">
            {loading
              ? "جاري التحميل..."
              : error
                ? "حدث خطأ"
                : selectedCountry?.name || "اختر الدولة"}
          </span>
        </div>

        <select
          value={countryKey}
          onChange={onCountryChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {loading ? (
            <option value="">جاري التحميل...</option>
          ) : error ? (
            <option value="">حدث خطأ</option>
          ) : (
            countries.map((c) => (
              <option key={c.key} value={c.key}>
                {c.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}

export default function ContactUsForm() {
  const issueTypes = useMemo(
    () => [
      "مشكلة في التسجيل / إنشاء حساب",
      "مشكلة في التواصل مع عميل",
      "مشكلة في التواصل مع حرفي",
      "شكوى على حرفي",
      "شكوى على عميل",
      "مشكلة في الدفع /التحصيل",
      "بلاغ عن إساءة استخدام",
      "اقتراح او تحسين",
      "استفسار عام ",
      "مشكلة تقنية في الموقع",
    ],
    [],
  );

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState("");

  const [form, setForm] = useState({
    email: "",
    countryKey: "",
    phone: "",
    issueType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const onChange = (key) => (e) => {
    setSuccessMsg("");
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const onPhoneChange = (e) => {
    setSuccessMsg("");
    const cleaned = e.target.value.replace(/[^\d]/g, "");
    setForm((p) => ({ ...p, phone: cleaned }));
  };

  useEffect(() => {
    let cancelled = false;

    async function loadCountries() {
      try {
        setCountriesLoading(true);
        setCountriesError("");

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2",
        );
        if (!res.ok) throw new Error("Failed to fetch countries");

        const data = await res.json();

        const mapped = data
          .map((c) => {
            const root = c?.idd?.root || "";
            const suffix = Array.isArray(c?.idd?.suffixes)
              ? c.idd.suffixes[0]
              : "";
            const callingCode =
              root && suffix ? `${root}${suffix}` : root || "";
            if (!callingCode) return null;

            const arName =
              c?.name?.translations?.ara?.common || c?.name?.common || "";
            const flag = c?.flags?.png || c?.flags?.svg || "";
            const cca2 = c?.cca2 || "";
            const key = `${cca2}|${callingCode}`;

            return { key, name: arName, code: callingCode, flag };
          })
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name, "ar"));

        if (cancelled) return;

        setCountries(mapped);

        const egypt = mapped.find((x) => x.key.startsWith("EG|"));
        setForm((p) => ({
          ...p,
          countryKey: egypt?.key || (mapped[0]?.key ?? ""),
        }));
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setCountriesError("تعذر تحميل قائمة الدول. حاول مرة أخرى.");
      } finally {
        if (!cancelled) setCountriesLoading(false);
      }
    }

    loadCountries();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCountry = useMemo(() => {
    return countries.find((c) => c.key === form.countryKey);
  }, [countries, form.countryKey]);

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "البريد الإلكتروني مطلوب";
    if (!form.issueType) next.issueType = "اختر نوع المشكلة";
    if (!form.message.trim()) next.message = "اكتب رسالتك";
    if (!form.countryKey) next.countryKey = "اختر الدولة";

    const phoneDigits = (form.phone || "").replace(/[^\d]/g, "");
    if (!phoneDigits) {
      next.phone = "رقم الهاتف مطلوب";
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      next.phone = "رقم الهاتف يجب أن يكون بين 8 و 15 رقم";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!validate()) return;

    const fullPhone = `${selectedCountry?.code ?? ""}${form.phone}`;

    console.log("CONTACT FORM:", {
      email: form.email,
      phone: fullPhone,
      issueType: form.issueType,
      message: form.message,
      country: selectedCountry,
    });

    setSuccessMsg("تم الإرسال بنجاح");
    setForm((p) => ({ ...p, issueType: "", message: "" }));
    window.setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <section dir="rtl" className="w-full bg-white pt-20 mt-10">
      <div className="mx-auto w-full max-w-[1400px] px-4">
        <div className="relative w-full overflow-hidden">
          <div className="bg-white">
            <div className="px-6 pt-8 md:px-10 md:pt-10">
              <h2 className="text-center text-xl md:text-2xl font-extrabold text-[#1E1B4B]">
                أخبرنا مشكلتك، <span className="text-[#C56A2D]">وسنساعدك</span>{" "}
                في حلّها
              </h2>
            </div>

            <form onSubmit={onSubmit} className="px-6 pb-10 pt-8 md:px-10">
              <div className="flex flex-col gap-6 md:flex-row md:flex-wrap">
                <div className="w-full md:w-[calc(33.333%-16px)]">
                  <FieldLabel
                    icon={Wrench}
                    className="text-[16px] md:text-[17px]"
                  >
                    نوع المشكلة
                  </FieldLabel>

                  <SelectInput
                    value={form.issueType}
                    onChange={onChange("issueType")}
                    className="text-[16px] md:text-[17px]"
                  >
                    <option value="" disabled>
                      اختر نوع المشكلة
                    </option>
                    {issueTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </SelectInput>

                  {errors.issueType && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.issueType}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-[calc(33.333%-16px)]">
                  <FieldLabel
                    icon={Phone}
                    className="text-[16px] md:text-[17px] items-start"
                  >
                    <span className="leading-tight">
                      طريقة التواصل
                      <br />
                      <span className="text-[14px] md:text-[15px]">
                        رقم الهاتف
                      </span>
                    </span>
                  </FieldLabel>

                  <PhoneCountryField
                    phone={form.phone}
                    onPhoneChange={onPhoneChange}
                    countryKey={form.countryKey}
                    onCountryChange={onChange("countryKey")}
                    countries={countries}
                    loading={countriesLoading}
                    error={countriesError}
                    selectedCountry={selectedCountry}
                  />

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-600">{errors.phone}</p>
                  )}
                  {errors.countryKey && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.countryKey}
                    </p>
                  )}
                  {countriesError && (
                    <p className="mt-2 text-xs text-red-600">
                      {countriesError}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-[calc(33.333%-16px)]">
                  <FieldLabel
                    icon={Mail}
                    className="text-[16px] md:text-[17px]"
                  >
                    الإيميل
                  </FieldLabel>

                  <TextInput
                    type="email"
                    placeholder="اكتب الإيميل الخاص بك"
                    value={form.email}
                    onChange={onChange("email")}
                    className="text-[16px] md:text-[17px]"
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <FieldLabel
                  icon={MessageSquareText}
                  className="text-[16px] md:text-[17px]"
                >
                  رسالتك
                </FieldLabel>

                <TextArea
                  rows={6}
                  placeholder="اكتب رسالتك ......"
                  value={form.message}
                  onChange={onChange("message")}
                  className="text-[16px] md:text-[17px]"
                />

                {errors.message && (
                  <p className="mt-2 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#181344] py-3.5 text-sm md:text-lg font-semibold text-white shadow-lg transition hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[#1E1B4B]/20"
                >
                  ارسال
                </button>

                {successMsg ? (
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm md:text-lg font-semibold text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{successMsg}</span>
                  </div>
                ) : (
                  <p className="mt-3 text-center text-sm md:text-lg text-[#C56A2D]">
                    سنقوم بالرد عليك قريباً
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
}