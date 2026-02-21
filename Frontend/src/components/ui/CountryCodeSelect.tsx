import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  US,
  IN,
  GB,
  AU,
  AE,
  SA,
  QA,
  OM,
  BH,
  KW,
  SG,
  MY,
  DE,
  FR,
  JP,
  CN,
  KR,
  BR,
  MX,
  CA,
  RU,
} from "country-flag-icons/react/3x2";

/* ─── Country code data ─────────────────────────────── */

export interface CountryCode {
  code: string;
  label: string;
  /** ISO 3166-1 alpha-2 country code used by country-flag-icons */
  iso: string;
  /** Number of digits expected (digits only, no spaces/dashes) */
  digits: number;
  /** Placeholder showing the local format */
  placeholder: string;
  /** Format pattern: groups of digit counts, e.g. [3,3,4] → "XXX XXX XXXX" */
  groups: number[];
}

export const COUNTRY_CODES: CountryCode[] = [
  // Priority countries
  {
    code: "+1",
    label: "US",
    iso: "US",
    digits: 10,
    placeholder: "XXX XXX XXXX",
    groups: [3, 3, 4],
  },
  {
    code: "+91",
    label: "IN",
    iso: "IN",
    digits: 10,
    placeholder: "XXXXX XXXXX",
    groups: [5, 5],
  },
  {
    code: "+1CA",
    label: "CA",
    iso: "CA",
    digits: 10,
    placeholder: "XXX XXX XXXX",
    groups: [3, 3, 4],
  },
  {
    code: "+61",
    label: "AU",
    iso: "AU",
    digits: 9,
    placeholder: "XXX XXX XXX",
    groups: [3, 3, 3],
  },
  {
    code: "+44",
    label: "GB",
    iso: "GB",
    digits: 10,
    placeholder: "XXXX XXX XXX",
    groups: [4, 3, 3],
  },
  // Alphabetical by label
  {
    code: "+971",
    label: "AE",
    iso: "AE",
    digits: 9,
    placeholder: "XX XXX XXXX",
    groups: [2, 3, 4],
  },
  {
    code: "+973",
    label: "BH",
    iso: "BH",
    digits: 8,
    placeholder: "XXXX XXXX",
    groups: [4, 4],
  },
  {
    code: "+55",
    label: "BR",
    iso: "BR",
    digits: 11,
    placeholder: "XX XXXXX XXXX",
    groups: [2, 5, 4],
  },
  {
    code: "+86",
    label: "CN",
    iso: "CN",
    digits: 11,
    placeholder: "XXX XXXX XXXX",
    groups: [3, 4, 4],
  },
  {
    code: "+49",
    label: "DE",
    iso: "DE",
    digits: 11,
    placeholder: "XXXX XXXXXXX",
    groups: [4, 7],
  },
  {
    code: "+33",
    label: "FR",
    iso: "FR",
    digits: 9,
    placeholder: "X XX XX XX XX",
    groups: [1, 2, 2, 2, 2],
  },
  {
    code: "+81",
    label: "JP",
    iso: "JP",
    digits: 10,
    placeholder: "XX XXXX XXXX",
    groups: [2, 4, 4],
  },
  {
    code: "+82",
    label: "KR",
    iso: "KR",
    digits: 10,
    placeholder: "XX XXXX XXXX",
    groups: [2, 4, 4],
  },
  {
    code: "+965",
    label: "KW",
    iso: "KW",
    digits: 8,
    placeholder: "XXXX XXXX",
    groups: [4, 4],
  },
  {
    code: "+52",
    label: "MX",
    iso: "MX",
    digits: 10,
    placeholder: "XX XXXX XXXX",
    groups: [2, 4, 4],
  },
  {
    code: "+60",
    label: "MY",
    iso: "MY",
    digits: 10,
    placeholder: "XX XXXX XXXX",
    groups: [2, 4, 4],
  },
  {
    code: "+968",
    label: "OM",
    iso: "OM",
    digits: 8,
    placeholder: "XXXX XXXX",
    groups: [4, 4],
  },
  {
    code: "+974",
    label: "QA",
    iso: "QA",
    digits: 8,
    placeholder: "XXXX XXXX",
    groups: [4, 4],
  },
  {
    code: "+7",
    label: "RU",
    iso: "RU",
    digits: 10,
    placeholder: "XXX XXX XX XX",
    groups: [3, 3, 2, 2],
  },
  {
    code: "+966",
    label: "SA",
    iso: "SA",
    digits: 9,
    placeholder: "XX XXX XXXX",
    groups: [2, 3, 4],
  },
  {
    code: "+65",
    label: "SG",
    iso: "SG",
    digits: 8,
    placeholder: "XXXX XXXX",
    groups: [4, 4],
  },
];

/* ─── Flag map ──────────────────────────────────────── */

const FLAG_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  US,
  IN,
  GB,
  AU,
  AE,
  SA,
  QA,
  OM,
  BH,
  KW,
  SG,
  MY,
  DE,
  FR,
  JP,
  CN,
  KR,
  BR,
  MX,
  CA,
  RU,
} as Record<string, React.ComponentType<{ className?: string }>>;

function FlagIcon({ iso, className }: { iso: string; className?: string }) {
  const Flag = FLAG_MAP[iso];
  if (!Flag) return <span className={className} />;
  return <Flag className={className} />;
}

/* ─── Component ─────────────────────────────────────── */

interface CountryCodeSelectProps {
  value: string;
  onChange: (code: string) => void;
}

export default function CountryCodeSelect({
  value,
  onChange,
}: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected =
    COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 w-[110px] h-10 px-2 rounded-md border border-[#1a3a5c] bg-[#122d4d] text-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors cursor-pointer"
      >
        <FlagIcon
          iso={selected.iso}
          className="h-4 w-6 rounded-[2px] shrink-0"
        />
        <span className="truncate">{selected.code}</span>
        <ChevronDown className="h-3.5 w-3.5 ml-auto shrink-0 text-[#7a8fa6]" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-[170px] max-h-48 overflow-y-auto rounded-md border border-[#1a3a5c] bg-[#122d4d] shadow-xl scrollbar-thin">
          {COUNTRY_CODES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                c.code === value
                  ? "bg-[#C9A227]/20 text-[#C9A227]"
                  : "text-white hover:bg-[#1a3a5c]"
              }`}
            >
              <FlagIcon
                iso={c.iso}
                className="h-3.5 w-5 rounded-[2px] shrink-0"
              />
              <span>{c.label}</span>
              <span className="ml-auto text-xs text-[#7a8fa6]">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Phone utilities ───────────────────────────────── */

/** Look up country metadata by dial code */
export function getCountryByCode(code: string): CountryCode {
  return COUNTRY_CODES.find((c) => c.code === code) ?? COUNTRY_CODES[0];
}

/** Strip everything except digits */
export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Format a raw digit string according to the country's group pattern.
 * e.g. "1234567890" with groups [3,3,4] → "123 456 7890"
 */
export function formatPhoneNumber(raw: string, countryCode: string): string {
  const country = getCountryByCode(countryCode);
  const digits = stripNonDigits(raw).slice(0, country.digits);
  const parts: string[] = [];
  let offset = 0;
  for (const size of country.groups) {
    if (offset >= digits.length) break;
    parts.push(digits.slice(offset, offset + size));
    offset += size;
  }
  return parts.join(" ");
}

/**
 * Validate a phone number for the selected country.
 * Returns an error message string or null if valid.
 */
export function validatePhoneNumber(
  raw: string,
  countryCode: string,
): string | null {
  const country = getCountryByCode(countryCode);
  const digits = stripNonDigits(raw);
  if (digits.length === 0) return "Phone number is required";
  if (digits.length < country.digits)
    return `Phone number must be ${country.digits} digits for ${country.label}`;
  if (digits.length > country.digits)
    return `Phone number must be ${country.digits} digits for ${country.label}`;
  return null;
}
