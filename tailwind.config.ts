import preset from "./vendor/altics-ui/tailwind-preset.js";

// The vendored bundle carries the components' own classes; the stories add
// their markup utilities. Same preset the package ships.
export default {
  content: ["./vendor/altics-ui/**/*.js", "./stories/**/*.{ts,tsx}", "./examples/**/*.{ts,tsx}"],
  presets: [preset],
};
