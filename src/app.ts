import Loaders from './loaders';
import colorConsole from './utils/colorConsole';

// Init Application with loaders
Object.keys(Loaders).forEach((e) => {
  if (typeof Loaders[e].load !== 'function') {
    colorConsole.yellow(`[Loader] ${e}: Failed to load\nCould not find load function`);
    return null;
  }

  colorConsole.gray(`[Loader] ${e}: Loading`);
  Loaders[e].load();
});
