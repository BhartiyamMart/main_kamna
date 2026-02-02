interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Professional Info' },
  ];

  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-2">
          {index > 0 && (
            <div className="h-0.5 w-12 bg-slate-300">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStep >= step.number ? 'w-full bg-[#21502c]' : 'w-0'
                }`}
              />
            </div>
          )}
          <div
            className={`flex items-center gap-2 ${currentStep >= step.number ? 'text-[#21502c]' : 'text-slate-400'}`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold ${
                currentStep >= step.number ? 'border-[#21502c] bg-[#21502c] text-white' : 'border-slate-300'
              }`}
            >
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className="hidden text-sm font-medium sm:inline">{step.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
