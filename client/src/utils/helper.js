export const isValidName = (name) => {
  const isValid = /^[\p{L}\p{M}'\s-]{1,100}$/u;

  if (!name || name.length === 0)
    return { ok: false, error: "Name is missing!" };
  if (!isValid.test(name.trim())) {
    return { ok: false, error: "Invalid name!" };
  }
  return { ok: true };
};

export const isValidEmail = (email) => {
  const isValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!email || email.length === 0)
    return { ok: false, error: "email is missing!" };
  if (!isValid.test(email.trim())) {
    return { ok: false, error: "Invalid email!" };
  }
  return { ok: true };
};

export const isValidPassword = (password) => {
  const isValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
  const errorReasons = [
    {
      test: !password || password.length === 0,
      error: "Password is missing!",
    },
    {
      test: !/[a-z]/.test(password),
      error: "Password must include at least one lowercase letter.",
    },
    {
      test: !/[A-Z]/.test(password),
      error: "Password must include at least one uppercase letter.",
    },
    {
      test: !/\d/.test(password),
      error: "Password must include at least one number.",
    },
    {
      test: !/[@$!%*?&]/.test(password),
      error: "Password must include at least one special character.",
    },
    {
      test: password.length < 6,
      error: "Password must be 6-20 characters long.",
    },
  ];

  for (const { test, error } of errorReasons) {
    if (test) return { ok: false, error };
  }

  if (!isValid.test(password.trim())) {
    return {
      ok: false,
      error:
        "Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    };
  }

  return { ok: true };
};
