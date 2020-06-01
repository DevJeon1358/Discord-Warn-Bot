import color from 'colors';

class ColorConsole {
  public static red(...str) {
    console.log(color.red(str.join(' ')));
  }

  public static green(...str) {
    console.log(color.green(str.join(' ')));
  }

  public static yellow(...str) {
    console.log(color.yellow(str.join(' ')));
  }

  public static gray(...str) {
    console.log(color.gray(str.join(' ')));
  }
}

export default ColorConsole;
