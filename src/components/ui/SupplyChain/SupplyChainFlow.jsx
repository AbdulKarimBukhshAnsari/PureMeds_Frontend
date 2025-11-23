import React from "react";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

// Import illustrations
import RawMaterialsImg from "../../../assets/Raw Materials.png";
import ManufacturingImg from "../../../assets/Manufacturing.png";
import PlatformImg from "../../../assets/Platform.png";
import QualityTestingImg from "../../../assets/QualityTesting.png";
import CustomerImg from "../../../assets/Customer.png";

const SupplyChainFlow = ({ supplyChainData }) => {
  const { details } = supplyChainData;

  const stages = [
    {
      key: "raw-material",
      label: "Raw Materials",
      image: RawMaterialsImg,
      data: details["raw-material"],
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      backBgColor: "bg-blue-100",
      textColor: "text-blue-900",
    },
    {
      key: "Manufacturer",
      label: "Manufacturer",
      image: ManufacturingImg,
      data: details.Manufacturer,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      backBgColor: "bg-purple-100",
      textColor: "text-purple-900",
    },
    {
      key: "Platform",
      label: "Platform",
      image: PlatformImg,
      data: details.Platform,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      backBgColor: "bg-orange-100",
      textColor: "text-orange-900",
    },
    {
      key: "Quality-testing",
      label: "Quality Testing",
      image: QualityTestingImg,
      data: details["Quality-testing"],
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      backBgColor: "bg-green-100",
      textColor: "text-green-900",
    },
    {
      key: "Customers",
      label: "Customer",
      image: CustomerImg,
      data: details.Customers,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      backBgColor: "bg-pink-100",
      textColor: "text-pink-900",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.key}>
            <SupplyChainCard stage={stage} />
            {index < stages.length - 1 && (
              <ArrowRight className="h-8 w-8 text-gray-400 hidden md:block flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const SupplyChainCard = ({ stage }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className="w-full md:w-[200px] h-[320px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1000px" }}
    >
      <div 
        className="relative w-full h-full transition-transform duration-500 ease-in-out" 
        style={{ 
          transformStyle: "preserve-3d", 
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" 
        }}
      >
        {/* Front Side */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-xl border-2 ${stage.borderColor} ${stage.bgColor} p-6 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow`} 
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="w-32 h-32 mb-4 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
            <img
              src={stage.image}
              alt={stage.label}
              className="w-full h-full object-contain p-3"
            />
          </div>
          <h3 className="font-bold text-gray-900 text-center mb-3 text-lg">{stage.label}</h3>
          <div className="flex items-center space-x-2">
            {stage.data.verified ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-sm text-green-600 font-semibold">Verified</span>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-500" />
                <span className="text-sm text-red-600 font-semibold">Not Verified</span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Hover to see details</p>
        </div>

        {/* Back Side */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-xl border-2 ${stage.borderColor} ${stage.backBgColor} p-6 flex flex-col items-center justify-center cursor-pointer shadow-lg`} 
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h3 className={`font-bold text-lg mb-3 text-center ${stage.textColor}`}>{stage.label}</h3>
            <div className="space-y-3 text-center w-full px-2">
              <div className="flex items-center justify-center space-x-2 mb-3">
                {stage.data.verified ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className={`font-semibold text-sm ${stage.textColor}`}>Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-600" />
                    <span className={`font-semibold text-sm ${stage.textColor}`}>Not Verified</span>
                  </>
                )}
              </div>
              {stage.data.name && (
                <div className="bg-white/80 rounded-lg p-3 border border-gray-200">
                  <p className={`text-xs mb-1 ${stage.textColor} opacity-70`}>Name</p>
                  <p className={`font-semibold text-sm ${stage.textColor} break-words line-clamp-2`}>{stage.data.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainFlow;

