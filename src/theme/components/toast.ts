interface SuccessToast {
  defaultOptions: {
    duration: number;
    isClosable: boolean;
    status: 'success';
  };
}
export const successToast: SuccessToast = {
  defaultOptions: {
    status: 'success',
    duration: 5000,
    isClosable: true,
  },
};
