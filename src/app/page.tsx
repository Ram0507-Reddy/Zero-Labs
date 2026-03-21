import { Hero3D } from '@/components/sections/Hero3D';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { FounderMessage } from '@/components/sections/FounderMessage';
import { Philosophy } from '@/components/sections/Philosophy';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero3D />
      <WhatWeDo />
      <Philosophy />
      <FinalCTA />
      <FounderMessage />
    </>
  );
}
