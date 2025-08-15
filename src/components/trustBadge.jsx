import { RefreshCw, ShieldCheck, Award, Infinity } from "lucide-react";

export default function WarrantyFeatures() {
  const features = [
    {
      icon: RefreshCw,
      title: "15 Day Exchange",
      subtitle: "On Online Orders",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "1 Year Warranty",
      subtitle: "On Online Orders",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: Award,
      title: "100% Certified",
      subtitle: "On Online Orders",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Infinity,
      title: "Lifetime Exchange",
      subtitle: "On Online Orders",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    // Full width container that touches screen boundaries
    <div className="w-screen " style={{ backgroundColor: 'rgb(246, 243, 249)' }}>
      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Desktop and Tablet Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`${feature.bgColor} p-2 rounded-full flex-shrink-0`}>
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-700 font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`${feature.bgColor} p-2 rounded-full flex-shrink-0`}>
                <feature.icon className={`w-4 h-4 ${feature.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-700 font-medium text-xs">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Compact Mobile Layout */}
        {/* Uncomment this section and comment the above mobile layout if you prefer a more compact version */}
        {/*
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white rounded-lg p-4 shadow-sm">
              <div className={`${feature.bgColor} p-3 rounded-full mb-2`}>
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <h3 className="text-gray-800 font-medium text-xs leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
        */}
      </div>
    </div>
    </div>
  );
}