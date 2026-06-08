import type { BirthdayData } from "@/types/birthday";

export const birthdayData: BirthdayData = {
  personName: "روزا",
  heroTitle: "كل سنة وإنتِ أجمل حاجة حصلتلي",
  heroSubtitle: "النهارده مش يوم عادي... النهارده يوم ميلاد أجمل قلب",
  mainPhoto: "/images/main-photo.jpg",

  memories: [
    {
      id: 1,
      title: "أول ذكرى",
      date: "يوم مميز",
      text: "هنا هنكتب أول ذكرى بينكم بشكل رومانسي وبسيط.",
      image: "/images/memories/memory-1.jpg",
    },
    {
      id: 2,
      title: "ضحكتك",
      date: "ذكرى جميلة",
      text: "كل مرة بشوف ضحكتك بحس إن الدنيا لسه بخير.",
      image: "/images/memories/memory-2.jpg",
    },
    {
      id: 3,
      title: "أجمل لحظة",
      date: "لحظة قريبة من القلب",
      text: "في لحظات بسيطة بس بتفضل عايشة جوانا طول العمر.",
      image: "/images/memories/memory-3.jpg",
    },
  ],

  letters: [
    {
      id: 1,
      title: "رسالة صغيرة",
      text: "كل سنة وإنتِ معايا، وكل سنة وإنتِ سبب فرحتي.",
    },
    {
      id: 2,
      title: "من قلبي",
      text: "أنا ممتن لوجودك في حياتي أكتر مما تتخيلي.",
    },
    {
      id: 3,
      title: "وعد",
      text: "أوعدك إن دايمًا هحاول أخليكي مبسوطة وآمنة ومطمنة.",
    },
  ],
};