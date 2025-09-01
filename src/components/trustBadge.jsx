import { RefreshCw, ShieldCheck, Award, Infinity } from "lucide-react";

export default function WarrantyFeatures() {
  const features = [
    {
      icon: RefreshCw,
      title: "15 Day\nExchange",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "1 Year\nWarranty",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: Award,
      title: "100%\nCertified",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Infinity,
      title: "Lifetime\nExchange",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    // Full width container that touches screen boundaries
    <div className="w-screen" style={{ backgroundColor: 'rgb(246, 243, 249)' }}>
      <div className="py-3 sm:py-4 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Single Row Layout for All Screen Sizes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`${feature.bgColor} p-2 sm:p-3 rounded-full mb-1 sm:mb-2`}>
                  <feature.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold text-xs sm:text-sm lg:text-base leading-tight whitespace-pre-line">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}