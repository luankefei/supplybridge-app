export const validateEmail = (email: string) => {
  if (email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  return false;
};

export const phonePattern = /^\(?([2-9][0-8][0-9])\)? ?([2-9][0-9]{2})[-.●]?([0-9]{4})$/;
export const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const trapSpacesForRequiredFields = (value: any) => !!value.trim();
export const numericPattern = /^([0-9]|#|\_|\*|\-|\ )+$/;