import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="text-gray-300 font-bold text-xl md:text-2xl lg:text-3xl">
            The<span className="text-primary">Journal</span>
        </Link>
    )
}