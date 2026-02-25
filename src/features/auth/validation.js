export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^(?:\+?20|0020)?01[0125]\d{8}$/;

export const passwordRules = {
  minLength: 8,
  hasUpper: /[A-Z]/,
  hasLower: /[a-z]/,
  hasNumber: /[0-9]/,
};


function validatePassword(password) {
  if (!password || password.length < passwordRules.minLength) {
    return "كلمة السر لازم تكون 8 أحرف على الأقل";
  }
  if (
    !passwordRules.hasUpper.test(password) ||
    !passwordRules.hasLower.test(password) ||
    !passwordRules.hasNumber.test(password)
  ) {
    return "لازم تحتوي على حرف كبير وصغير ورقم";
  }
  return null;
}

export function validateClientRegister(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 3) {
    errors.fullName = "الاسم لازم يكون 3 حروف على الأقل";
  }

  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = "اكتب بريد إلكتروني صحيح";
  }

  const passErr = validatePassword(values.password);
  if (passErr) errors.password = passErr;

  if (!values.agreeTerms) {
    errors.agreeTerms = "لازم توافق على الشروط";
  }

  return errors;
}

export function validateLogin(values) {
  const errors = {};

  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = "اكتب بريد إلكتروني صحيح";
  }

  if (!values.password || values.password.length < passwordRules.minLength) {
    errors.password = "كلمة السر مطلوبة";
  }

  return errors;
}

export function validateCraftsmanStep1(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 3) {
    errors.fullName = "الاسم لازم يكون 3 حروف على الأقل";
  }

  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = "اكتب بريد إلكتروني صحيح";
  }

  const passErr = validatePassword(values.password);
  if (passErr) errors.password = passErr;

  return errors;
}

export function validateCraftsmanStep2(values) {
  const errors = {};

  if (!values.phoneNumber || !phoneRegex.test(values.phoneNumber.trim())) {
    errors.phoneNumber = "اكتب رقم موبايل مصري صحيح";
  }

  if (!values.areaId || Number(values.areaId) <= 0) {
    errors.areaId = "اختار المنطقة";
  }

  if (
    values.yearsOfExperience === "" ||
    values.yearsOfExperience === null ||
    values.yearsOfExperience === undefined
  ) {
    errors.yearsOfExperience = "سنين الخبرة مطلوبة";
  } else if (Number(values.yearsOfExperience) < 0) {
    errors.yearsOfExperience = "سنين الخبرة لازم تكون 0 أو أكثر";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "لازم توافق على الشروط";
  }

  return errors;
}

export function validateCraftsmanRegister(values) {
  return {
    ...validateCraftsmanStep1(values),
    ...validateCraftsmanStep2(values),
  };
}