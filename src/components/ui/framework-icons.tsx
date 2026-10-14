import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function ReactIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <circle cx="90" cy="90" r="88" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_nextjs)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_nextjs)" />
      <defs>
        <linearGradient
          id="paint0_linear_nextjs"
          x1="109"
          y1="116.5"
          x2="144.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_nextjs"
          x1="121"
          y1="54"
          x2="120.799"
          y2="106.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ReactNativeIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="5" y="2" width="14" height="20" rx="3" stroke="#61DAFB" fill="none" strokeWidth="1.8" />
      <line x1="11" y1="18" x2="13" y2="18" stroke="#61DAFB" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="10" r="1.5" fill="#61DAFB" />
      <ellipse cx="12" cy="10" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1" fill="none" />
      <ellipse cx="12" cy="10" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 10)" />
      <ellipse cx="12" cy="10" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 10)" />
    </svg>
  );
}

export function TypeScriptIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip_ts_exact)">
        <path fill="#017acb" d="M0 0h100v100H0z" />
        <path
          fill="#fff"
          d="M48.016 37.031h4.797v8.282h-12.97v36.843l-.343.094c-.469.125-6.64.125-7.969-.016l-1.062-.093V45.312H17.5v-8.28l4.11-.048c2.25-.03 8.03-.03 12.843 0 4.813.032 10.906.047 13.563.047m36.61 41.219c-1.907 2.016-3.954 3.14-7.36 4.063-1.485.406-1.735.421-5.078.406-3.344-.016-3.61-.016-5.235-.438-4.203-1.078-7.594-3.187-9.906-6.172-.656-.843-1.734-2.593-1.734-2.812 0-.063.156-.203.359-.297s.625-.36.969-.562c.343-.204.968-.579 1.39-.797.422-.22 1.64-.938 2.703-1.579 1.063-.64 2.032-1.156 2.141-1.156.11 0 .313.219.469.485.937 1.578 3.125 3.593 4.672 4.28.953.407 3.062.86 4.078.86.937 0 2.656-.406 3.578-.828.984-.453 1.484-.906 2.078-1.812.406-.641.453-.813.438-2.032 0-1.125-.063-1.437-.375-1.953-.875-1.437-2.063-2.187-6.875-4.312-4.97-2.203-7.204-3.516-9.016-5.282-1.344-1.312-1.61-1.67-2.453-3.312-1.094-2.11-1.235-2.797-1.25-5.937-.016-2.204.031-2.922.265-3.672.329-1.125 1.391-3.297 1.875-3.844 1-1.172 1.36-1.531 2.063-2.11 2.125-1.75 5.438-2.906 8.61-3.015.359 0 1.546.062 2.656.14 3.187.266 5.359 1.047 7.453 2.72 1.578 1.25 3.968 4.187 3.734 4.577-.156.235-6.39 4.391-6.797 4.516-.25.078-.422-.016-.765-.422-2.125-2.547-2.985-3.094-5.047-3.219-1.469-.093-2.25.078-3.235.735-1.03.687-1.53 1.734-1.53 3.187.015 2.125.827 3.125 3.827 4.61 1.938.953 3.594 1.734 3.719 1.734.188 0 4.203 2 5.25 2.625 4.875 2.86 6.86 5.797 7.375 10.86.375 3.812-.703 7.296-3.047 9.765"
        />
      </g>
      <defs>
        <clipPath id="clip_ts_exact">
          <rect width="100" height="100" rx="14" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function TailwindIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 61 41"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 0C19.8 0 15.3 5.4 13.5 10.8C16.2 8.1 19.35 6.75 22.95 6.75C27.9 6.75 30.6 10.35 32.4 14.4C34.65 19.35 38.25 24.3 47.25 24.3C54.45 24.3 58.95 18.9 60.75 13.5C58.05 16.2 54.9 17.55 51.3 17.55C46.35 17.55 43.65 13.95 41.85 9.9C39.6 4.95 36 0 27 0ZM13.5 16.2C6.3 16.2 1.8 21.6 0 27C2.7 24.3 5.85 22.95 9.45 22.95C14.4 22.95 17.1 26.55 18.9 30.6C21.15 35.55 24.75 40.5 33.75 40.5C40.95 40.5 45.45 35.1 47.25 29.7C44.55 32.4 41.4 33.75 37.8 33.75C32.85 33.75 30.15 30.15 28.35 26.1C26.1 21.15 22.5 16.2 13.5 16.2Z"
        fill="#38BDF8"
      />
    </svg>
  );
}
