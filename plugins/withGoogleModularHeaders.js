const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

// Google Sign-In pulls in AppCheckCore / GoogleUtilities / RecaptchaInterop —
// Swift pods that don't define modules. Under the New Architecture's
// static-library linking this fails pod install ("cannot yet be integrated as
// static libraries"). Declaring them with modular headers is Apple/CocoaPods'
// documented workaround. We inject the lines into the generated Podfile at
// prebuild so the managed workflow keeps building.
const MARKER = 'GuestCam:modular-headers';
const POD_LINES = [
  `  # ${MARKER}`,
  "  pod 'GoogleUtilities', :modular_headers => true",
  "  pod 'AppCheckCore', :modular_headers => true",
  "  pod 'RecaptchaInterop', :modular_headers => true",
].join('\n');

module.exports = function withGoogleModularHeaders(config) {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfile = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfile, 'utf8');
      if (!contents.includes(MARKER)) {
        // Insert right after the app target opens its expo modules block.
        contents = contents.replace(/use_expo_modules!/, `use_expo_modules!\n${POD_LINES}`);
        fs.writeFileSync(podfile, contents);
      }
      return cfg;
    },
  ]);
};
