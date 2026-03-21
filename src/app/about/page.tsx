import { Container } from '@/components/global/Container';

export default function AboutPage() {
  return (
    <div className="pt-40 pb-32 bg-black min-h-[90vh]">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12 text-white">
            Operational Methodology.
          </h1>
          
          <div className="space-y-16 text-neutral-400 leading-relaxed text-lg">
            <section>
              <h2 className="text-white font-medium mb-4 text-xl">The Axiom</h2>
              <p>
                Most infrastructure is built on assumptions. We build on zero. 
                Zero Labs exists because modern software engineering has compromised reliability for speed, burying critical systems under layers of fragile dependency.
              </p>
            </section>
            
            <section>
              <h2 className="text-white font-medium mb-4 text-xl">Operational Focus</h2>
              <ul className="space-y-4 list-none p-0">
                <li className="flex gap-4">
                  <span className="text-neutral-600 font-mono">[01]</span>
                  <span className="text-neutral-200"><strong>Data Sovereignty:</strong> Systems designed never to leak state.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-neutral-600 font-mono">[02]</span>
                  <span className="text-neutral-200"><strong>Edge Deployment:</strong> Local-first, decentralized network topologies.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-neutral-600 font-mono">[03]</span>
                  <span className="text-neutral-200"><strong>Architectural Integrity:</strong> Solutions built from raw primitives, devoid of bloated frameworks.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-medium mb-4 text-xl">The Statement</h2>
              <p>
                We do not believe in moving fast and breaking things. We believe in moving securely and building things that cannot be broken. It is a mathematical approach to digital risk.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
