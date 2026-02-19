import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="text-center justify-center bg-page-bg text-text-secondary h-screen flex flex-col gap-4">
      <span className="text-5xl">404 Page Not Found</span>
      <Link href="/">
        <button className="bg-cyan-bright text-white px-4 py-2 rounded-full hover:bg-white hover:text-cyan-950 hover:scale-105 transition-all duration-300">
          Return Home
        </button>
      </Link>
    </div>
  )
}