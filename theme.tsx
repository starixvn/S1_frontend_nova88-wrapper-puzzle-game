import { getFontSize, getScaledSize } from "./src/utilities/rn-helper";
import { extendTheme } from "native-base";

export const BASE_STYLE = {
  fontSize: getFontSize(14),
  inputHeight: getScaledSize(40),
  containerPadding: {
    vertical: getScaledSize(16),
    top: getScaledSize(16),
    bottom: getScaledSize(16),
    horizontal: getScaledSize(8),
    left: getScaledSize(8),
    right: getScaledSize(8),
  },
  containerMargin: {
    vertical: getScaledSize(16),
    top: getScaledSize(16),
    bottom: getScaledSize(16),
    horizontal: getScaledSize(8),
    left: getScaledSize(8),
    right: getScaledSize(8),
  },
};

const sizeGenerator = () => {
  const sizeList = [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 32,
    40, 48, 56, 64, 72, 80, 96,
  ];

  let sizeObj: { [index: string]: number } = { "0": 0 };
  sizeList.forEach((s: number) => {
    sizeObj[s.toString()] = getScaledSize(s * 4);
  });
  return sizeObj;
};

const sizes = sizeGenerator();

const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#fffbeb",
      100: "#eab308",
      200: "#b45309",
      300: "#92400e",
    },
    secondary: {
      200: "#ecf3fd",
    },
    error: {
      400: "#d83b35",
      500: "#f43f5e",
    },
    info: {
      400: "#fab617",
      700: "#f77900",
    },
    grey: {
      50: "#e2e2e2",
      100: "#bfc0c3",
      200: "#b2b2b2",
      500: "#6f7a8e",
    },
    muted: {
      50: "#f2f4f7",
    },
    green: {
      300: "#259076",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
  components: {
    Text: {
      baseStyle: {
        color: "#1f2e4d",
        fontSize: BASE_STYLE.fontSize,
      },
    },
    Button: {
      baseStyle: {
        color: "white",
      },
      variants: {
        solid: ({ colorScheme, theme }) => {
          switch (colorScheme) {
            case "primary": {
              return {
                bg: "#1e85ec",
                _text: {
                  color: "white",
                },
              };
            }
            case "secondary": {
              return {
                bg: theme.colors.secondary["500"],
                _text: {
                  color: "white",
                },
                _pressed: {
                  bg: theme.colors.secondary["800"],
                },
              };
            }
            case "darkBlue": {
              return {
                bg: theme.colors.primary["700"],
                _text: {
                  color: "white",
                },
                _pressed: {
                  bg: theme.colors.primary["500"],
                },
              };
            }
            case "white": {
              return {
                bg: "#ffffff",
                _text: {
                  color: "white",
                },
                _pressed: {
                  bg: theme.colors.grey["100"],
                },
              };
            }
          }
        },
      },
      sizes: {
        md: {
          _text: {
            fontSize: BASE_STYLE.fontSize,
          },
        },
      },
    },
    Icon: {
      baseStyle: {},
      sizes: {
        md: 5,
      },
      defaultProps: {
        color: "primary.400",
      },
    },
    IconButton: {
      baseStyle: {},
      defaultProps: {},
      variants: {
        unstyled: {
          borderRadius: 999,
        },
        solid: ({ colorScheme, theme }) => {
          if (colorScheme === "secondary")
            return {
              bg: theme.colors.secondary["500"],
              _text: {
                color: "white",
              },
              _pressed: {
                bg: "#664b00",
                _icon: {
                  color: "white",
                },
              },
            };
        },
      },
      sizes: {},
    },
    ModalHeader: {
      baseStyle: {
        py: "3",
        pl: "3",
        pr: 12,
        backgroundColor: "#284985",
      },
    },
    ModalBody: {
      baseStyle: {
        _text: {
          color: "#052561",
        },
      },
    },
    ModalContent: {
      baseStyle: {
        backgroundColor: "#eaf1ff",
        rounded: "sm",
      },
    },
    ModalFooter: {
      baseStyle: {
        backgroundColor: "#eaf1ff",
      },
    },
    ModalCloseButton: {
      baseStyle: {
        right: "3",
        top: "2",
      },
    },
    Badge: {
      baseStyle: {
        px: "1.5",
      },
      defaultProps: {},
      variants: {
        subtle: {
          bg: "primary.350",
          borderRadius: 4,
        },
      },
      sizes: {},
    },
  },
  sizes,
  space: sizes,
});

// https://docs.nativebase.io/typescript
// 2. Get the type of the CustomTheme
type CustomThemeType = typeof customTheme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export default customTheme;
