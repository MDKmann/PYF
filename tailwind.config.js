// VScode workaround file -- IGNORE

tailwind.config = {
    darkMode: "class",
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        textShadow: {
          sm: '0 1px 2px var(--tw-shadow-color)',
          DEFAULT: '0 2px 4px var(--tw-shadow-color)',
          lg: '0 8px 16px var(--tw-shadow-color)',
        },
      },
    },
    plugins: [
      plugin(function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value,
            }),
          },
          { values: theme('textShadow') }
        )
      }),
    ],
  };
  // darkMode: "class",
  //       content: ["./src/**/*.{html,js}"],
  //       theme: {
  //         extend: {
  //           fontSize: {
  //             'h1': '48px',
  //             'h2': '36px',
  //             'h3': '30px',
  //             'h4': '24px',
  //             'h5': '20px',
  //             'h6': '16px',
  //           },
  //         },
  //       },
  //     };