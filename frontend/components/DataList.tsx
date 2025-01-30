import { ReactElement } from "react";
import { Check } from "lucide-react";

interface DataItem {
  icon: ReactElement;
  description: string;
}

interface DataListProps {
  items?: DataItem[];
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  descriptionClassName?: string;
}

export function DataList({
  items,
  className = "flex flex-col gap-4",
  itemClassName = "flex items-center gap-2",
  iconClassName = "flex-shrink-0 text-blue-500",
  descriptionClassName = "text-white font-semibold"
}: DataListProps) {
  if (!items?.length) return null;

  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={index} className={itemClassName}>
          <span className={iconClassName}>{item.icon}</span>
          <span className={descriptionClassName}>{item.description}</span>
        </li>
      ))}
    </ul>
  );
}

const items = [
  "Language support : 70+",
  "Intelligent Analytics",
  "SLA",
  "Leads generation",
  "Unlimited seat capacity",
  "Token Authentication",
  "Custom features",
  "Business actions",
  "Handle open-ended conversations",
  "User feedback loop",
  "Explainable AI modelling",
  "Unlimited number of stories",
  "Unlimited training history",
  "Tailored onboarding",
  "Call and email support",
  "Advanced reporting",
  "Team collaboration",
  "Prioritized engineering support",
  "Customised agent roles",
  "10K-100K word training set",
  "Dedicated account manager",
  "Self service",
  "Helpdesk support",
  "Remove Beyondchats branding",
  "Prioritized indexing",
  "Scalable data and query",
  "Custom API calls",
  "Daily, weekly, monthly, quarterly email reports"
].map(description => ({ icon: <Check className="w-5 h-5" />, description }));

export default function App() {
  return <DataList items={items} />;
}
