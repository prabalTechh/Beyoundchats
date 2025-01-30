export function Navbar() {
    return <div className="w-full h-16 flex items-center justify-between px-20  text-white font-sans ">
        <div className="flex items-center gap-1">
            <img src="https://beyondchats.com/wp-content/uploads/2024/04/output-onlinepngtools.png" alt="Logo_img" className="h-12" />
            <a href="#" className="text-xl font-bold tracking-tighter text-offWhiteLogo">BeyondChats</a>
        </div>

        <ul className=" hidden md:flex gap-4 text-sm font-semibold">
            <li>Product</li>
            <li>Review</li>
            <li>About</li>
        </ul>

        <div>
            <button className="px-5 hidden md:block py-2 text-xs font-semibold bg-SecondaryButton ">
                Build your free chatbot
            </button>
        </div>
    </div>
}