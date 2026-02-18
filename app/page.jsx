import { Bebas_Neue, Raleway } from "next/font/google";

const bebas = Bebas_Neue({
    weight: "400",
    subsets: ["latin"]
});

const raleway = Raleway({
    subsets: ["latin"]
})

export default function Home() {
    return (
        <main className="bg-[url('/images/mbs_night.jpg')] bg-cover bg-center min-h-screen">
            <div className="bg-black/50 min-h-screen flex flex-col items-center justify-start text-white px-4 pt-32">
                
                <h1 
                    className={`${bebas.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center leading-tight`}
                    style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}
                >
                    Singapore's Digital
                    <br />
                    Journey
                </h1>
                
                <p 
                    className={`${raleway.className} font-bold text-lg sm:text-xl md:text-2xl mt-4 md:mt-6 text-center max-w-2xl px-4`}
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                >
                    From humble beginnings in 1991 to becoming one of the world's most connected nations
                </p>
                
                <div className="mt-6 md:mt-8">
                    <a href="/foundation">
                        <button className={`${raleway.className} 
                            bg-white text-black 
                            text-lg sm:text-xl 
                            rounded-full 
                            w-40 sm:w-48 
                            py-3 sm:py-4 
                            font-semibold 
                            hover:bg-cyan-bright hover:text-white 
                            hover:scale-105 active:scale-95
                            transition-all duration-300 
                            shadow-lg hover:shadow-2xl
                            min-h-12
                        `}>
                            Begin Journey
                        </button>
                    </a>
                </div>
                
            </div>
        </main>
    );
}