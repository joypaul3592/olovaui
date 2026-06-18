export default function GlowCardPreview() {
  return (
    <div className="relative h-32 w-full max-w-[300px] overflow-hidden rounded-lg border border-violet-400/20 bg-[#08070c] p-4 text-white shadow-[0_18px_50px_rgba(8,7,12,0.35)]">
      <div className="absolute right-4 top-4 h-24 w-32 rounded-full bg-violet-500/[0.35] blur-2xl" />
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-300/80 to-transparent" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase text-violet-200">Glow Card</p>
        <p className="mt-3 max-w-[230px] text-lg font-semibold leading-5">Pointer-lit pricing panel</p>
      </div>
      <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">
        <span>Pro seat</span>
        <span className="font-semibold text-violet-200">$24</span>
      </div>
    </div>
  );
}
