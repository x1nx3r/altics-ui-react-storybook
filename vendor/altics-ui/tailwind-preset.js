var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tailwindcss/lib/util/createPlugin.js
var require_createPlugin = __commonJS({
  "node_modules/tailwindcss/lib/util/createPlugin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    function createPlugin(plugin2, config) {
      return {
        handler: plugin2,
        config
      };
    }
    createPlugin.withOptions = function(pluginFunction, configFunction = () => ({})) {
      const optionsFunction = function(options) {
        return {
          __options: options,
          handler: pluginFunction(options),
          config: configFunction(options)
        };
      };
      optionsFunction.__isOptionsFunction = true;
      optionsFunction.__pluginFunction = pluginFunction;
      optionsFunction.__configFunction = configFunction;
      return optionsFunction;
    };
    var _default = createPlugin;
  }
});

// node_modules/tailwindcss/lib/public/create-plugin.js
var require_create_plugin = __commonJS({
  "node_modules/tailwindcss/lib/public/create-plugin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    var _createPlugin = /* @__PURE__ */ _interop_require_default(require_createPlugin());
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var _default = _createPlugin.default;
  }
});

// node_modules/tailwindcss/plugin.js
var require_plugin = __commonJS({
  "node_modules/tailwindcss/plugin.js"(exports, module) {
    var createPlugin = require_create_plugin();
    module.exports = (createPlugin.__esModule ? createPlugin : { default: createPlugin }).default;
  }
});

// theme/tailwind-theme.ts
var import_plugin = __toESM(require_plugin(), 1);

// src/theme/theme-extend.ts
var themeExtend = {
  fontFamily: {
    sans: ["Manrope", "sans-serif"]
  },
  colors: {
    // Custom semantic colors
    background: "hsl(var(--color-background) / <alpha-value>)",
    foreground: "hsl(var(--color-foreground) / <alpha-value>)",
    primary: {
      DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
      foreground: "hsl(var(--color-primary-foreground) / <alpha-value>)",
      50: "var(--color-primary-50)",
      100: "var(--color-primary-100)",
      200: "var(--color-primary-200)",
      300: "var(--color-primary-300)",
      400: "var(--color-primary-400)",
      500: "var(--color-primary-500)",
      600: "var(--color-primary-600)",
      700: "var(--color-primary-700)",
      800: "var(--color-primary-800)",
      900: "var(--color-primary-900)",
      950: "var(--color-primary-950)"
    },
    secondary: {
      DEFAULT: "hsl(var(--color-secondary) / <alpha-value>)",
      foreground: "hsl(var(--color-secondary-foreground) / <alpha-value>)",
      50: "var(--color-secondary-50)",
      100: "var(--color-secondary-100)",
      200: "var(--color-secondary-200)",
      300: "var(--color-secondary-300)",
      400: "var(--color-secondary-400)",
      500: "var(--color-secondary-500)",
      600: "var(--color-secondary-600)",
      700: "var(--color-secondary-700)",
      800: "var(--color-secondary-800)",
      900: "var(--color-secondary-900)",
      950: "var(--color-secondary-950)"
    },
    success: {
      primary: "var(--color-text-success-primary)",
      light: "var(--color-bg-success-light)"
    },
    warning: {
      primary: "var(--color-text-warning-primary)",
      light: "var(--color-bg-warning-light)"
    },
    error: {
      primary: "var(--color-text-error-primary)",
      light: "var(--color-bg-error-light)"
    },
    muted: {
      DEFAULT: "hsl(var(--color-muted) / <alpha-value>)",
      foreground: "hsl(var(--color-muted-foreground) / <alpha-value>)"
    },
    border: "hsl(var(--color-border) / <alpha-value>)",
    input: "hsl(var(--color-input) / <alpha-value>)",
    ring: "hsl(var(--color-ring) / <alpha-value>)",
    placeholder: "hsl(var(--color-placeholder) / <alpha-value>)",
    destructive: {
      DEFAULT: "hsl(var(--color-destructive) / <alpha-value>)",
      foreground: "hsl(var(--color-destructive-foreground) / <alpha-value>)"
    },
    // Focus ring colours from the sheets (brand-500 / red-500). The tokens
    // existed but were never reachable as utilities.
    focus: "hsl(var(--color-focus-ring) / <alpha-value>)",
    "focus-error": "hsl(var(--color-focus-ring-error) / <alpha-value>)",
    // Tailwind 4.3 default colors
    slate: {
      50: "var(--color-slate-50)",
      100: "var(--color-slate-100)",
      200: "var(--color-slate-200)",
      300: "var(--color-slate-300)",
      400: "var(--color-slate-400)",
      500: "var(--color-slate-500)",
      600: "var(--color-slate-600)",
      700: "var(--color-slate-700)",
      800: "var(--color-slate-800)",
      900: "var(--color-slate-900)",
      950: "var(--color-slate-950)"
    },
    gray: {
      50: "var(--color-gray-50)",
      100: "var(--color-gray-100)",
      200: "var(--color-gray-200)",
      300: "var(--color-gray-300)",
      400: "var(--color-gray-400)",
      500: "var(--color-gray-500)",
      600: "var(--color-gray-600)",
      700: "var(--color-gray-700)",
      800: "var(--color-gray-800)",
      900: "var(--color-gray-900)",
      950: "var(--color-gray-950)"
    },
    zinc: {
      50: "var(--color-zinc-50)",
      100: "var(--color-zinc-100)",
      200: "var(--color-zinc-200)",
      300: "var(--color-zinc-300)",
      400: "var(--color-zinc-400)",
      500: "var(--color-zinc-500)",
      600: "var(--color-zinc-600)",
      700: "var(--color-zinc-700)",
      800: "var(--color-zinc-800)",
      900: "var(--color-zinc-900)",
      950: "var(--color-zinc-950)"
    },
    neutral: {
      50: "var(--color-neutral-50)",
      100: "var(--color-neutral-100)",
      200: "var(--color-neutral-200)",
      300: "var(--color-neutral-300)",
      400: "var(--color-neutral-400)",
      500: "var(--color-neutral-500)",
      600: "var(--color-neutral-600)",
      700: "var(--color-neutral-700)",
      800: "var(--color-neutral-800)",
      900: "var(--color-neutral-900)",
      950: "var(--color-neutral-950)"
    },
    stone: {
      50: "var(--color-stone-50)",
      100: "var(--color-stone-100)",
      200: "var(--color-stone-200)",
      300: "var(--color-stone-300)",
      400: "var(--color-stone-400)",
      500: "var(--color-stone-500)",
      600: "var(--color-stone-600)",
      700: "var(--color-stone-700)",
      800: "var(--color-stone-800)",
      900: "var(--color-stone-900)",
      950: "var(--color-stone-950)"
    },
    red: {
      50: "var(--color-red-50)",
      100: "var(--color-red-100)",
      200: "var(--color-red-200)",
      300: "var(--color-red-300)",
      400: "var(--color-red-400)",
      500: "var(--color-red-500)",
      600: "var(--color-red-600)",
      700: "var(--color-red-700)",
      800: "var(--color-red-800)",
      900: "var(--color-red-900)",
      950: "var(--color-red-950)"
    },
    orange: {
      50: "var(--color-orange-50)",
      100: "var(--color-orange-100)",
      200: "var(--color-orange-200)",
      300: "var(--color-orange-300)",
      400: "var(--color-orange-400)",
      500: "var(--color-orange-500)",
      600: "var(--color-orange-600)",
      700: "var(--color-orange-700)",
      800: "var(--color-orange-800)",
      900: "var(--color-orange-900)",
      950: "var(--color-orange-950)"
    },
    amber: {
      50: "var(--color-amber-50)",
      100: "var(--color-amber-100)",
      200: "var(--color-amber-200)",
      300: "var(--color-amber-300)",
      400: "var(--color-amber-400)",
      500: "var(--color-amber-500)",
      600: "var(--color-amber-600)",
      700: "var(--color-amber-700)",
      800: "var(--color-amber-800)",
      900: "var(--color-amber-900)",
      950: "var(--color-amber-950)"
    },
    yellow: {
      50: "var(--color-yellow-50)",
      100: "var(--color-yellow-100)",
      200: "var(--color-yellow-200)",
      300: "var(--color-yellow-300)",
      400: "var(--color-yellow-400)",
      500: "var(--color-yellow-500)",
      600: "var(--color-yellow-600)",
      700: "var(--color-yellow-700)",
      800: "var(--color-yellow-800)",
      900: "var(--color-yellow-900)",
      950: "var(--color-yellow-950)"
    },
    lime: {
      50: "var(--color-lime-50)",
      100: "var(--color-lime-100)",
      200: "var(--color-lime-200)",
      300: "var(--color-lime-300)",
      400: "var(--color-lime-400)",
      500: "var(--color-lime-500)",
      600: "var(--color-lime-600)",
      700: "var(--color-lime-700)",
      800: "var(--color-lime-800)",
      900: "var(--color-lime-900)",
      950: "var(--color-lime-950)"
    },
    green: {
      50: "var(--color-green-50)",
      100: "var(--color-green-100)",
      200: "var(--color-green-200)",
      300: "var(--color-green-300)",
      400: "var(--color-green-400)",
      500: "var(--color-green-500)",
      600: "var(--color-green-600)",
      700: "var(--color-green-700)",
      800: "var(--color-green-800)",
      900: "var(--color-green-900)",
      950: "var(--color-green-950)"
    },
    emerald: {
      50: "var(--color-emerald-50)",
      100: "var(--color-emerald-100)",
      200: "var(--color-emerald-200)",
      300: "var(--color-emerald-300)",
      400: "var(--color-emerald-400)",
      500: "var(--color-emerald-500)",
      600: "var(--color-emerald-600)",
      700: "var(--color-emerald-700)",
      800: "var(--color-emerald-800)",
      900: "var(--color-emerald-900)",
      950: "var(--color-emerald-950)"
    },
    teal: {
      50: "var(--color-teal-50)",
      100: "var(--color-teal-100)",
      200: "var(--color-teal-200)",
      300: "var(--color-teal-300)",
      400: "var(--color-teal-400)",
      500: "var(--color-teal-500)",
      600: "var(--color-teal-600)",
      700: "var(--color-teal-700)",
      800: "var(--color-teal-800)",
      900: "var(--color-teal-900)",
      950: "var(--color-teal-950)"
    },
    cyan: {
      50: "var(--color-cyan-50)",
      100: "var(--color-cyan-100)",
      200: "var(--color-cyan-200)",
      300: "var(--color-cyan-300)",
      400: "var(--color-cyan-400)",
      500: "var(--color-cyan-500)",
      600: "var(--color-cyan-600)",
      700: "var(--color-cyan-700)",
      800: "var(--color-cyan-800)",
      900: "var(--color-cyan-900)",
      950: "var(--color-cyan-950)"
    },
    sky: {
      50: "var(--color-sky-50)",
      100: "var(--color-sky-100)",
      200: "var(--color-sky-200)",
      300: "var(--color-sky-300)",
      400: "var(--color-sky-400)",
      500: "var(--color-sky-500)",
      600: "var(--color-sky-600)",
      700: "var(--color-sky-700)",
      800: "var(--color-sky-800)",
      900: "var(--color-sky-900)",
      950: "var(--color-sky-950)"
    },
    blue: {
      50: "var(--color-blue-50)",
      100: "var(--color-blue-100)",
      200: "var(--color-blue-200)",
      300: "var(--color-blue-300)",
      400: "var(--color-blue-400)",
      500: "var(--color-blue-500)",
      600: "var(--color-blue-600)",
      700: "var(--color-blue-700)",
      800: "var(--color-blue-800)",
      900: "var(--color-blue-900)",
      950: "var(--color-blue-950)"
    },
    indigo: {
      50: "var(--color-indigo-50)",
      100: "var(--color-indigo-100)",
      200: "var(--color-indigo-200)",
      300: "var(--color-indigo-300)",
      400: "var(--color-indigo-400)",
      500: "var(--color-indigo-500)",
      600: "var(--color-indigo-600)",
      700: "var(--color-indigo-700)",
      800: "var(--color-indigo-800)",
      900: "var(--color-indigo-900)",
      950: "var(--color-indigo-950)"
    },
    violet: {
      50: "var(--color-violet-50)",
      100: "var(--color-violet-100)",
      200: "var(--color-violet-200)",
      300: "var(--color-violet-300)",
      400: "var(--color-violet-400)",
      500: "var(--color-violet-500)",
      600: "var(--color-violet-600)",
      700: "var(--color-violet-700)",
      800: "var(--color-violet-800)",
      900: "var(--color-violet-900)",
      950: "var(--color-violet-950)"
    },
    purple: {
      50: "var(--color-purple-50)",
      100: "var(--color-purple-100)",
      200: "var(--color-purple-200)",
      300: "var(--color-purple-300)",
      400: "var(--color-purple-400)",
      500: "var(--color-purple-500)",
      600: "var(--color-purple-600)",
      700: "var(--color-purple-700)",
      800: "var(--color-purple-800)",
      900: "var(--color-purple-900)",
      950: "var(--color-purple-950)"
    },
    fuchsia: {
      50: "var(--color-fuchsia-50)",
      100: "var(--color-fuchsia-100)",
      200: "var(--color-fuchsia-200)",
      300: "var(--color-fuchsia-300)",
      400: "var(--color-fuchsia-400)",
      500: "var(--color-fuchsia-500)",
      600: "var(--color-fuchsia-600)",
      700: "var(--color-fuchsia-700)",
      800: "var(--color-fuchsia-800)",
      900: "var(--color-fuchsia-900)",
      950: "var(--color-fuchsia-950)"
    },
    pink: {
      50: "var(--color-pink-50)",
      100: "var(--color-pink-100)",
      200: "var(--color-pink-200)",
      300: "var(--color-pink-300)",
      400: "var(--color-pink-400)",
      500: "var(--color-pink-500)",
      600: "var(--color-pink-600)",
      700: "var(--color-pink-700)",
      800: "var(--color-pink-800)",
      900: "var(--color-pink-900)",
      950: "var(--color-pink-950)"
    },
    rose: {
      50: "var(--color-rose-50)",
      100: "var(--color-rose-100)",
      200: "var(--color-rose-200)",
      300: "var(--color-rose-300)",
      400: "var(--color-rose-400)",
      500: "var(--color-rose-500)",
      600: "var(--color-rose-600)",
      700: "var(--color-rose-700)",
      800: "var(--color-rose-800)",
      900: "var(--color-rose-900)",
      950: "var(--color-rose-950)"
    }
  },
  textColor: {
    // Brand text colors
    "brand-primary": "var(--color-text-brand-primary)",
    "brand-secondary": "var(--color-text-brand-secondary)",
    "brand-secondary-hover": "var(--color-text-brand-secondary-hover)",
    "brand-tertiary": "var(--color-text-brand-tertiary)",
    "brand-tertiary-alt": "var(--color-text-brand-tertiary-alt)",
    // Semantic text colors
    "error": "var(--color-text-error-primary)",
    "warning": "var(--color-text-warning-primary)",
    "success": "var(--color-text-success-primary)",
    // General text colors
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
    tertiary: "var(--color-text-tertiary)",
    quaternary: "var(--color-text-quaternary)",
    disabled: "var(--color-text-disabled)",
    white: "var(--color-text-white)",
    inverse: "var(--color-text-inverse)",
    link: "var(--color-text-link)",
    "link-hover": "var(--color-text-link-hover)",
    placeholder: "var(--color-placeholder)",
    // The flat `primary` / `secondary` keys above shadow the nested
    // colors.primary / colors.secondary objects for text utilities, which
    // drops their `-foreground` variants. Restore them here.
    "primary-foreground": "hsl(var(--color-primary-foreground) / <alpha-value>)",
    "secondary-foreground": "hsl(var(--color-secondary-foreground) / <alpha-value>)"
  },
  spacing: {
    none: "var(--spacing-none)",
    xxs: "var(--spacing-xxs)",
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)",
    "2xl": "var(--spacing-2xl)",
    "3xl": "var(--spacing-3xl)",
    "4xl": "var(--spacing-4xl)",
    "5xl": "var(--spacing-5xl)",
    "6xl": "var(--spacing-6xl)",
    "7xl": "var(--spacing-7xl)",
    "8xl": "var(--spacing-8xl)",
    "9xl": "var(--spacing-9xl)",
    "10xl": "var(--spacing-10xl)",
    "11xl": "var(--spacing-11xl)"
  },
  width: {
    xxs: "var(--width-xxs)",
    xs: "var(--width-xs)",
    sm: "var(--width-sm)",
    md: "var(--width-md)",
    lg: "var(--width-lg)",
    xl: "var(--width-xl)",
    "2xl": "var(--width-2xl)",
    "3xl": "var(--width-3xl)",
    "4xl": "var(--width-4xl)",
    "5xl": "var(--width-5xl)",
    "6xl": "var(--width-6xl)"
  },
  maxWidth: {
    "container-desktop": "var(--container-max-width-desktop)",
    "paragraph": "var(--paragraph-max-width)"
  },
  padding: {
    "container-mobile": "var(--container-padding-mobile)",
    "container-desktop": "var(--container-padding-desktop)"
  },
  borderRadius: {
    none: "var(--radius-none)",
    xxs: "var(--radius-xxs)",
    xs: "var(--radius-xs)",
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
    "3xl": "var(--radius-3xl)",
    "4xl": "var(--radius-4xl)",
    full: "var(--radius-full)"
  }
};

// theme/tailwind-theme.ts
var plugins = [
  (0, import_plugin.default)(function({ addUtilities, theme }) {
    addUtilities({
      ".shadow-xs": {
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
      },
      ".shadow-sm": {
        boxShadow: "0 1px 2px -1px rgba(0, 0, 0, 0.10), 0 1px 3px 0 rgba(0, 0, 0, 0.06)"
      },
      ".shadow-md": {
        boxShadow: "0 2px 4px -2px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.10)"
      },
      ".shadow-lg": {
        boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.03), 0 12px 16px -4px rgba(0, 0, 0, 0.08)"
      },
      ".shadow-xl": {
        boxShadow: "0 3px 3px -1.5px rgba(0, 0, 0, 0.04), 0 8px 8px -4px rgba(0, 0, 0, 0.03), 0 20px 24px -4px rgba(0, 0, 0, 0.08)"
      },
      ".radius-xxs": {
        borderRadius: "2px"
      },
      ".radius-xs": {
        borderRadius: "4px"
      },
      ".radius-sm": {
        borderRadius: "6px"
      },
      ".radius-md": {
        borderRadius: "8px"
      },
      ".radius-lg": {
        borderRadius: "10px"
      },
      ".radius-xl": {
        borderRadius: "12px"
      },
      ".radius-2xl": {
        borderRadius: "16px"
      },
      ".radius-3xl": {
        borderRadius: "20px"
      },
      ".radius-4xl": {
        borderRadius: "24px"
      },
      ".radius-full": {
        borderRadius: "9999px"
      },
      ".backdrop-blur-sm": {
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      },
      ".backdrop-blur-md": {
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)"
      },
      ".backdrop-blur-lg": {
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)"
      },
      ".backdrop-blur-xl": {
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)"
      }
    });
  })
];

// tailwind.preset.ts
var tailwind_preset_default = {
  theme: {
    extend: themeExtend
  },
  plugins
};
export {
  tailwind_preset_default as default
};
