import {
  FiTrendingUp,
  FiZap,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";

const Cards = () => {
  const cards = [
    {
      title: "إجمالي المبيعات",
      value: "1,245,600",
      subtitle: "12.5% عن الشهر الماضي",
      icon: FiTrendingUp,
      iconBg: "bg-[#eef7fb]",
      iconColor: "text-[#197ca8]",
      subtitleColor: "text-[#159447]",
      direction: "up",
    },
    {
      title: "المبيعات المباشرة",
      value: "4,852,190",
      subtitle: "قيمة المبيعات الفورية",
      icon: FiZap,
      iconBg: "bg-[#eef7fb]",
      iconColor: "text-[#197ca8]",
      subtitleColor: "text-[#505966]",
    },
    {
      title: "مبيعات العقود",
      value: "45,250",
      subtitle: "شاملة الفواتير الجزئية والنهائية",
      icon: FiFileText,
      iconBg: "bg-[#eef7fb]",
      iconColor: "text-[#197ca8]",
      subtitleColor: "text-[#1683b3]",
    },
    {
      title: "أرصدة غير محصلة",
      value: "45,250",
      subtitle: "8 فواتير تجاوزت موعد الاستحقاق",
      icon: FiAlertCircle,
      iconBg: "bg-[#fff0f0]",
      iconColor: "text-[#d51f2c]",
      subtitleColor: "text-[#d51f2c]",
    },
  ];

  return (
    <div className="mx-8 mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex h-[143px] flex-col justify-between rounded-[18px] bg-white px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          >
            {/* Top - العنوان يمين، الأيقونة شمال */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-bold text-[#4d5562]">
                {card.title}
              </span>

              <div
                className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] ${card.iconBg} ${card.iconColor}`}
              >
                <Icon size={21} strokeWidth={2.2} />
              </div>
            </div>

            {/* Value - الرقم يمين، ر.س شماله */}
            <div className="flex items-end gap-2">
              <span className="text-[31px] font-extrabold leading-none text-[#2e3137]">
                {card.value}
              </span>
              <span className="mb-[3px] text-[13px] text-[#34383d]">
                ر.س
              </span>
            </div>

            {/* Subtitle - على اليمين */}
            <div
              className={`flex items-center gap-1 text-[12px] font-medium ${card.subtitleColor}`}
            >
              {card.direction === "up" && (
                <span className="text-[14px]">↑</span>
              )}
              {card.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;