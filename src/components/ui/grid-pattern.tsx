export function GridPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]">
      <div className="absolute left-0 right-0 top-0 m-auto h-[50vh] w-[50vw] rounded-full bg-neutral-300 dark:bg-white/5 opacity-30 dark:opacity-20 blur-[120px]"></div>
    </div>
  );
}
