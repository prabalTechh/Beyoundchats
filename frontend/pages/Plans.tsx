import { PriceCart } from "@/components/PriceCart";
import { BorderSvg } from "@/icons/BorderSvg";

export function Plans() {
    return (
        <div className="min-h-screen bg-white">
            <div className="h-8">
                <BorderSvg />
            </div>

            <div className="flex min-h-[calc(100vh-2rem)]  items-center justify-center py-24 px-4">
                <div className="max-w-4xl w-full mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Pick the plan that's right for you
                        </h1>
                        <p className="text-lg text-gray-600">
                            Try AI chatbot free for 14 days. No credit card required. Pay once you are satisfied.
                        </p>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex items-center text-sm bg-slate-400 justify-center border rounded-full w-fit mx-auto mb-12">
                        <button className="px-6 py-2 rounded-s-full text-white font-medium  transition-colors">
                            Monthly
                        </button>
                        <button className="px-6 py-2 bg-white rounded-full m-1 text-SecondaryButton font-medium transition-colors">
                            Annually
                        </button>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Startup Plan */}
                        <PriceCart title="Startup" description="Best for individuals and startups who are just getting started" Price="899" savings="(You save ₹ 1,200 yearly)

" data="50 chats in a month" data1="Basic dashboard (Chats management)" data2="Train chatbot on 20 Article" data3="Restricted dashboard" />
                        <PriceCart title="Standard" description="Best for startups who are figuring out their go-to-market strategy" Price="4499" savings="(You save ₹6,000 yearly)

" data="50 chats in a month" data1="Advanced Dashboard" data2="Train chatbot on 500 Article" data3="Emailers: Daily Stats + Monthly analysis" />
                        <PriceCart title="Business" description="Best for businesses who want to convert large number of users into customers" Price="6999" savings="(You save ₹ 12,000 yearly)

" data="50 chats in a month" data1="Advanced Dashboard" data2="Train chatbot on 1k Article" data3="AI Analysis" />


                    </div>
                </div>
            </div>
            <div className="rotate-180 h-20"><BorderSvg /></div>
        </div>
    );
}

export default Plans;