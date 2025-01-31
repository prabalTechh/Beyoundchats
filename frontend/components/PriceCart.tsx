import { Check } from "lucide-react"


interface dataProps {
    title:string,
    description:string,
    Price:string,
    savings: string
    ,data:string,
    data1:string,
    data2:string,
    data3:string,
}

export function PriceCart({title,description,Price,savings,data,data1,data2,data3}:dataProps){
    return  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="p-8">
      <h2 className="text-2xl text-center font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <div className="mb-6 text-center">
        <span className="text-4xl font-bold text-gray-900">{Price}</span>
        <span className="text-gray-600 text-xs ml-2">₹/month</span>
      </div>
      <p className="text-sm text-center text-slate-600 mb-6">
        {savings}
      </p>
      <button className="w-full py-3 px-6 rounded-lg bg-SecondaryButton text-white font-medium hover:bg-blue-700 transition-colors">
        Get Started
      </button>
    </div>

    <div className="border-t border-gray-200 p-8">
      <ul className="space-y-1">
        <li className="flex items-center text-gray-700">
          <Check className="w-5 h-5 text-[#5698FF] mr-3 rounded-full bg-[#DCE9FF] p-1" />
          {data}
        </li>
        <li className="flex items-center text-gray-700">
          <Check className="w-5 h-5 text-[#5698FF] mr-3 rounded-full bg-[#DCE9FF] p-1" />
         {data1}
        </li>
        <li className="flex items-center text-gray-700">
          <Check className="w-5 h-5 text-[#5698FF] mr-3 rounded-full bg-[#DCE9FF] p-1" />
          {data2}
        </li>
        <li className="flex items-center text-gray-700">
          <Check className="w-5 h-5 text-[#5698FF] mr-3 rounded-full bg-[#DCE9FF] p-1" />
         {data3}
        </li>
      </ul>
    </div>
  </div>
}