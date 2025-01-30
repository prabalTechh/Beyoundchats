import Image from "next/image"

interface typesSpan {
    icon: string,
    text: string
}


export function CommonSpan({ icon, text }: typesSpan) {
    return <div className="flex items-center justify-center text-sm gap-2 ">

        <span className="text-PrimaryButton "><Image src={icon} alt="" height={20} width={30} /></span><span className="text-white text-left">{text}</span>

    </div>
}