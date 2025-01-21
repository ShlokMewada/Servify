export const checkValidDataSignUp = (
  firstName,
  lastName,
  username,
  email,
  password
) => {
  const isFirstNameValid = /^[a-zA-Z]{2,}$/.test(firstName);

  const isLastNameValid = /^[a-zA-Z]{2,}$/.test(lastName);

  const isUserNameValid = /^[a-zA-Z0-9_]{3,16}$/.test(username);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  let usernameMsg = "";
  let firstNameMsg = "";
  let lastNameMsg = "";
  let passwordMsg = "";
  let emailMsg = "";

  if (
    isEmailValid &&
    isPasswordValid &&
    isFirstNameValid &&
    isLastNameValid &&
    isUserNameValid
  ) {
    return { firstNameMsg, lastNameMsg, passwordMsg, emailMsg, usernameMsg };
  } else {
    if (!isUserNameValid) {
      usernameMsg = "Username is not valid!";
    }
    if (!isPasswordValid) {
      passwordMsg = "Password is not valid!";
    }
    if (!isEmailValid) {
      emailMsg = "Email ID is not valid!";
    }
    if (!isFirstNameValid) {
      firstNameMsg = "First Name is not valid!";
    }
    if (!isLastNameValid) {
      lastNameMsg = "Last Name is not valid!";
    }

    return { firstNameMsg, lastNameMsg, usernameMsg, passwordMsg, emailMsg };
  }
};

export const checkValidDataSignIn = (email, password) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  let passwordMsg = "";
  let emailMsg = "";

  if (isEmailValid && isPasswordValid) {
    return { passwordMsg, emailMsg };
  } else {
    if (!isPasswordValid) {
      passwordMsg = "Password is not valid!";
    }
    if (!isEmailValid) {
      emailMsg = "Email ID is not valid!";
    }

    return { passwordMsg, emailMsg };
  }
};

export const checkValidDataContact = (firstName, lastName, email, phoneNo) => {
  const isFirstNameValid = /^[a-zA-Z]{2,}$/.test(firstName);

  const isLastNameValid = /^[a-zA-Z]{2,}$/.test(lastName);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPhoneNoValid = /^[0-9]{10}$/.test(phoneNo);

  let firstNameMsg = "";
  let lastNameMsg = "";
  let emailMsg = "";
  let phoneNoMsg = "";

  if (isEmailValid && isFirstNameValid && isLastNameValid && isPhoneNoValid) {
    return { firstNameMsg, emailMsg, isPhoneNoValid };
  } else {
    if (!isFirstNameValid) {
      firstNameMsg = "First Name is not valid!";
    }
    if (!isLastNameValid) {
      firstNameMsg = "Last Name is not valid!";
    }
    if (!isEmailValid) {
      emailMsg = "Email ID is not valid!";
    }
    if (!isPhoneNoValid) {
      phoneNoMsg = "Phone no. is not valid";
    }

    return { firstNameMsg, lastNameMsg, emailMsg, phoneNoMsg };
  }
};
