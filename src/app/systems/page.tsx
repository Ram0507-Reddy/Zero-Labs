import { Container } from "@/components/global/Container";
import Link from "next/link";

export default function SystemsPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-32 mt-16 bg-black min-h-[80vh]">
      <Container className="max-w-4xl text-center px-6">
        
        <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-900 rounded-full mb-10 border border-neutral-800 shadow-sm mt-8">
          <svg className="w-8 h-8 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
          SYSTEMS C<span className="text-neutral-600">O</span>MING S<span className="text-neutral-600">O</span>ON.
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Our public telemetry dashboard and active systems registry are currently under architectural review. We are establishing the baseline primitives.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex px-10 py-4 rounded-full border-2 border-neutral-800 hover:border-white transition-colors text-white font-semibold text-sm tracking-widest uppercase"
        >
          RETURN TO CORE
        </Link>
      </Container>
    </div>
  );
}
