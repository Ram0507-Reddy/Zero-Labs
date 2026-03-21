import { Container } from './Container';

export function Footer() {
  const leftLoop = "M 395.585 325.036 C 364.712 329.906, 340.761 346.665, 327.751 372.500 C 326.366 375.250, 323.986 381.325, 322.462 386 C 319.976 393.623, 319.682 395.996, 319.608 409 C 319.539 421.262, 319.877 424.718, 321.800 431.395 C 329.326 457.531, 347.370 478.591, 370.552 488.298 C 397.663 499.651, 425.056 499.211, 454.444 486.953 C 464.761 482.650, 497.640 464.270, 525 447.512 C 529.675 444.648, 535.300 441.270, 537.500 440.006 C 539.700 438.741, 543.631 436.379, 546.236 434.757 L 550.973 431.809 545.782 424.374 C 537.793 412.932, 538.874 413.247, 528.469 419.331 C 523.536 422.215, 509.825 429.907, 498 436.424 C 486.175 442.941, 473.099 450.154, 468.942 452.454 C 456.152 459.528, 442.870 465.739, 434.644 468.492 C 407.090 477.712, 375.482 471.182, 359.828 453.035 C 348.512 439.917, 343.906 428.240, 343.248 411 C 342.751 397.958, 344.178 390.560, 349.108 380.623 C 357.321 364.070, 368.513 355.145, 387.639 349.898 C 394.179 348.104, 397.321 347.843, 407.938 348.210 C 428.422 348.919, 437.676 352.294, 477.684 373.643 L 484.869 377.477 495.133 370.391 C 500.779 366.493, 505.552 362.844, 505.740 362.281 C 506.341 360.478, 467.740 339.503, 451.767 332.953 C 446.294 330.709, 437.920 327.997, 433.158 326.926 C 423.054 324.655, 404.059 323.699, 395.585 325.036";
  const rightLoop = "M 601.500 324.604 C 583.145 327.323, 565.763 334.117, 550.411 344.573 C 542.857 349.718, 542.129 350.334, 521.074 369.422 C 478.044 408.431, 461.008 424.406, 461.714 425.087 C 462.146 425.505, 469.411 426.561, 477.858 427.434 L 493.216 429.021 496.519 426.260 C 498.336 424.742, 509.565 414.500, 521.474 403.500 C 561.982 366.081, 567.366 361.789, 582.279 355.027 C 603.193 345.545, 628.665 345.163, 647.500 354.051 C 664.289 361.974, 678.695 383.201, 680.873 403.227 C 682.350 416.805, 680.373 427.324, 673.942 440.114 C 662.080 463.709, 638.293 475.438, 608.831 472.221 C 595.878 470.807, 585.468 467.287, 565.225 457.478 L 549.951 450.076 536.513 456.694 C 529.122 460.334, 523.270 463.628, 523.509 464.014 C 524.258 465.227, 562.052 483.560, 571.799 487.439 C 588.817 494.212, 598.667 496.252, 614.500 496.282 C 629.886 496.311, 638.070 494.736, 652.008 489.064 C 696.911 470.790, 717.788 416.793, 696.621 373.675 C 690.980 362.182, 683.241 352.041, 674.928 345.246 C 666.466 338.330, 648.782 329.582, 638 326.980 C 629.740 324.986, 608.330 323.592, 601.500 324.604";

  return (
    <footer className="py-24 bg-[#fafafa] border-t border-neutral-200 transition-colors duration-500 text-black">
      <Container className="flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="flex flex-col gap-8">
          {/* Custom DOM-based Logo for maximum crispness & layout control */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <svg viewBox="315 320 390 180" className="w-16 h-auto text-black transition-transform group-hover:scale-105 duration-300">
              <path d={leftLoop} fill="currentColor" />
              <path d={rightLoop} fill="currentColor" />
            </svg>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold tracking-[0.2em] leading-none text-black">ZERO</span>
              <span className="text-sm font-semibold tracking-[0.3em] leading-none text-neutral-500 mt-1">LABS</span>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 max-w-xs font-medium">
            Privacy at the core.
          </p>
        </div>
        <div className="flex gap-16 text-sm text-neutral-500 font-medium">
          <div className="flex flex-col gap-4">
            <span className="text-neutral-900 font-bold mb-2 font-mono text-xs tracking-widest">[ INFRASTRUCTURE ]</span>
            <a href="#" className="hover:text-black transition-colors">Protocols</a>
            <a href="#" className="hover:text-black transition-colors">Deployment</a>
            <a href="#" className="hover:text-black transition-colors">Telemetry</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-neutral-900 font-bold mb-2 font-mono text-xs tracking-widest">[ LEGAL ]</span>
            <a href="#" className="hover:text-black transition-colors">Privacy Schema</a>
            <a href="#" className="hover:text-black transition-colors">Trust Model</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
