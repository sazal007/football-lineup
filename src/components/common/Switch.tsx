type SwitchProps = {
  checked: boolean;
  onChange: () => void;
  className?: string;
};

export function Switch({ checked, onChange, className = "" }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:ring-offset-2 ${
        checked ? "bg-[#4ade80]" : "bg-gray-700"
      } ${className}`}
      onClick={onChange}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
}