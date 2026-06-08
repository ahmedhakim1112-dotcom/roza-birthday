export const LOVE_SCENE_MUSIC_SRC = "/music/love-scene.mp3";

export const englishHandFont =
  '"Caveat", "Segoe Script", "Brush Script MT", "Comic Sans MS", cursive';

export const arabicCardFont = '"Marhey", "Segoe UI", "Tahoma", sans-serif';

export type LetterCard = {
  text: string;
  signature: string;
  x: string;
  y: string;
  rotate: number;
  delay: number;
  lang: "ar" | "en";
  widthClass?: string;
  textClassName?: string;
};

export const letterCards: LetterCard[] = [
  {
    lang: "en",
    text: `Happy Birthday 🎂🎉✨

I hope you're having an amazing day surrounded by happiness, laughter, and all the people who care about you. Today is your special day, and you truly deserve all the good things that come your way.

I just wanted to take a moment to wish you a wonderful birthday and let you know that you are a great person. Your kindness, your positive energy, and your way of making others feel comfortable are qualities that make you special.`,
    signature: "Kmr",
    x: "-66%",
    y: "-10%",
    rotate: -5,
    delay: 0.1,
    widthClass: "w-[320px]",
  },
  {
    lang: "en",
    text: `Even though we may not always spend a lot of time together, I genuinely appreciate knowing you and having you in my life. You have a beautiful personality, and I hope you never stop being the amazing person that you are.

May this new year of your life bring you success, happiness, good health, and many unforgettable moments. I hope you achieve your goals and that every day gives you a new reason to smile.

Enjoy every moment of your birthday, make beautiful memories, and celebrate yourself because today is all about you.

Happy Birthday once again. Wishing you nothing but the best today and always. 🎂💗✨`,
    signature: "Kmr",
    x: "54%",
    y: "-16%",
    rotate: 5,
    delay: 0.22,
    widthClass: "w-[332px]",
    textClassName: "text-[13.3px] leading-[1.56]",
  },
  {
    lang: "ar",
    text: `كل عام وانتي بخير اختي حبيبة قلبي 🤍`,
    signature: "اختك دانا",
    x: "-80%",
    y: "-44%",
    rotate: -6,
    delay: 0.34,
    widthClass: "w-[280px]",
    textClassName: "text-[16px] leading-[2]",
  },
  {
    lang: "ar",
    text: `رزونه حبيبتي كل عام وانتي بخير وعقبال الميه بصحه وسعاده ان شاء الله 🤍`,
    signature: "تالا",
    x: "70%",
    y: "14%",
    rotate: 4,
    delay: 0.46,
    widthClass: "w-[310px]",
    textClassName: "text-[15px] leading-[1.95]",
  },
  {
    lang: "ar",
    text: `رزونه حبيبتي صديقتي وعشرة عمري
كل عام وانتي بخير وصحه وسلامه
ان شاء الله تكون سنه حلوه عليكي زيك
ان شاء الله يا رب تحققي كل الي بتتمنيه
يا رب، بحبك كتير يا قلبي`,
    signature: "أمونه",
    x: "-54%",
    y: "42%",
    rotate: 3,
    delay: 0.58,
    widthClass: "w-[338px]",
    textClassName: "text-[14px] leading-[1.95]",
  },
  {
    lang: "ar",
    text: `رزونه صديقتي الصدوقه صديقه المدرسه
صديقه الفرح والزعل صديقه ١٠ سنين
ام المقالب والنهوفات الرنخه العمر كله
حبيبه قلبي عقبال المليون سنه تعيشي
وضلك تمقلبينا وضلك تزانخي علينا
وتنكشي مخك علينا كل عام وانتي معنا
منوره حياتنا بحبك 🤍`,
    signature: "رهف رحال",
    x: "30%",
    y: "46%",
    rotate: -4,
    delay: 0.7,
    widthClass: "w-[358px]",
    textClassName: "text-[12.8px] leading-[1.95]",
  },
];

export const floatingHearts = [
  { left: "3%", size: 7, delay: 0, duration: 10.2, drift: 7 },
  { left: "6%", size: 5, delay: 0.28, duration: 11.4, drift: -6 },
  { left: "9%", size: 8, delay: 0.58, duration: 10.8, drift: 8 },
  { left: "12%", size: 6, delay: 0.9, duration: 12, drift: -7 },
  { left: "15%", size: 9, delay: 1.18, duration: 10.6, drift: 9 },
  { left: "18%", size: 5, delay: 1.48, duration: 11.8, drift: -5 },
  { left: "21%", size: 7, delay: 1.78, duration: 10.4, drift: 7 },
  { left: "24%", size: 6, delay: 2.08, duration: 11.6, drift: -8 },
  { left: "27%", size: 10, delay: 2.38, duration: 10.9, drift: 9 },
  { left: "30%", size: 5, delay: 2.68, duration: 12.2, drift: -6 },
  { left: "33%", size: 8, delay: 2.98, duration: 10.7, drift: 8 },
  { left: "36%", size: 6, delay: 3.28, duration: 11.9, drift: -7 },
  { left: "39%", size: 9, delay: 3.58, duration: 10.5, drift: 7 },
  { left: "42%", size: 5, delay: 3.88, duration: 11.7, drift: -6 },
  { left: "45%", size: 7, delay: 4.18, duration: 10.3, drift: 8 },
  { left: "48%", size: 6, delay: 4.48, duration: 12.1, drift: -8 },
  { left: "51%", size: 10, delay: 4.78, duration: 10.8, drift: 9 },
  { left: "54%", size: 5, delay: 5.08, duration: 11.5, drift: -5 },
  { left: "57%", size: 8, delay: 5.38, duration: 10.6, drift: 7 },
  { left: "60%", size: 6, delay: 5.68, duration: 11.8, drift: -7 },
  { left: "63%", size: 9, delay: 5.98, duration: 10.4, drift: 9 },
  { left: "66%", size: 5, delay: 6.28, duration: 12, drift: -6 },
  { left: "69%", size: 7, delay: 6.58, duration: 10.9, drift: 8 },
  { left: "72%", size: 6, delay: 6.88, duration: 11.6, drift: -8 },
  { left: "75%", size: 10, delay: 7.18, duration: 10.7, drift: 9 },
  { left: "78%", size: 5, delay: 7.48, duration: 11.9, drift: -5 },
  { left: "81%", size: 8, delay: 7.78, duration: 10.5, drift: 7 },
  { left: "84%", size: 6, delay: 8.08, duration: 11.7, drift: -7 },
  { left: "87%", size: 9, delay: 8.38, duration: 10.3, drift: 8 },
  { left: "90%", size: 5, delay: 8.68, duration: 12.1, drift: -6 },
  { left: "93%", size: 7, delay: 8.98, duration: 10.8, drift: 7 },
  { left: "96%", size: 6, delay: 9.28, duration: 11.5, drift: -5 },
  { left: "98%", size: 8, delay: 9.58, duration: 10.6, drift: 6 },
];