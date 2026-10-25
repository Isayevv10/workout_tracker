import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dəqiqə
  max: 100, // Hər IP-dən maksimum 100 sorğu
  standardHeaders: true, // Rate limit məlumatlarını header-də qaytarır
  legacyHeaders: false, // Köhnə X-RateLimit başlıqlarını söndürür
  message: {
    success: false,
    message: "Çox sayda sorğu göndərildi. Zəhmət olmasa bir az gözləyin.",
  },
});

// Giriş və qeydiyyat üçün daha sərt limit (Məsələn: 1 dəqiqədə 5 cəhd)
export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dəqiqə
  max: 5, // Maksimum 5 uğursuz cəhd
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Çox sayda cəhd edildi. Zəhmət olmasa 1 dəqiqə sonra yenidən sınayın.",
  },
});
