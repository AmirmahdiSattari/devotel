export const validations = {
  mustFilled: {
    required: "This field is required",
  },

  numberOnly: {
    required: "This field is required",
    pattern: {
      value: /^[0-9]+$/,
      message: "Should be a number",
    },
    min: {
      value: 50000,
      message: "Minimum value is 50,000",
    },
    max: {
      value: 5000000,
      message: "Maximum value is 5,000,000",
    },
  },
};
