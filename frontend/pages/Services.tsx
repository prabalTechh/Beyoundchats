import { DataList } from "@/components/DataList";
import { Check } from "lucide-react";

const items = [
  "Language support : 70+",
  "Intelligent Analytics",
  "SLA",
  "Leads generation",
  "Unlimited seat capacity",
  "Token Authentication",
  "Custom features",
  "Business actions",
].map(description => ({ 
  icon: <Check className="w-5 h-5 text-primaryButton" />, 
  description 
}));

const item2 = [
  "Unlimited number of stories",
  "Unlimited training history",
  "Tailored onboarding",
  "Call and email support",
  "Advanced reporting",
  "Team collaboration",
  "Prioritized engineering support",
  "Customised agent roles",
].map(description => ({ 
  icon: <Check className="w-5 h-5 text-primaryButton" />, 
  description 
}));

const item3 = [
  "Handle open-ended conversations",
  "User feedback loop",
  "Explainable AI modelling",
  "Helpdesk support",
  "Remove Beyondchats branding",
  "Prioritized indexing",
  "Scalable data and query",
  "Custom API calls",
].map(description => ({ 
  icon: <Check className="w-5 h-5 text-primaryButton" />, 
  description 
}));

const item4 = [
  "10K-100K word training set",
  "Dedicated account manager",
  "Self service",
  "Daily, weekly, monthly",
  "quarterly email reports"
].map(description => ({ 
  icon: <Check className="w-5 h-5 text-primaryButton" />, 
  description 
}));

export function Services() {
  return (
    <div className="max-w-screen-xl mx-auto pt-20 px-4 md:px-6">
      <div className="flex flex-col items-center gap-8 md:gap-20">
        <h1 className="text-2xl md:text-4xl py-6 md:py-10 text-white font-semibold tracking-tight text-center">
          A truly customizable Chatbot with premium features
        </h1>
        
        {/* Grid container for lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 text-sm w-full">
          <div className="w-full">
            <DataList 
              items={items}
              className="flex flex-col gap-4"
              itemClassName="flex items-start gap-2"
              descriptionClassName="text-gray-300"
            />
          </div>
          
          <div className="w-full">
            <DataList 
              items={item2}
              className="flex flex-col gap-4"
              itemClassName="flex items-start gap-2"
              descriptionClassName="text-gray-300"
            />
          </div>
          
          <div className="w-full">
            <DataList 
              items={item3}
              className="flex flex-col gap-4"
              itemClassName="flex items-start gap-2"
              descriptionClassName="text-gray-300"
            />
          </div>
          
          <div className="w-full">
            <DataList 
              items={item4}
              className="flex flex-col gap-4"
              itemClassName="flex items-start gap-2"
              descriptionClassName="text-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;