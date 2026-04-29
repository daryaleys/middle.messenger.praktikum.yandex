export const loginPageData = {
    cardModifier: "",
    fieldsModifier: "auth-form__fields--login",
    linkHref: "/signin",
    linkText: "Нет аккаунта?",
    submitHref: "/",
    submitText: "Авторизоваться",
    title: "Вход",
    titleId: "login-title",
    fields: [
        {
            label: "Логин",
            name: "login",
            type: "text",
        },
        {
            label: "Пароль",
            name: "password",
            type: "password",
        },
    ],
};

export const signInPageData = {
    cardModifier: "auth-card--signup",
    fieldsModifier: "",
    linkHref: "/login",
    linkText: "Войти",
    submitHref: "/",
    submitText: "Зарегистрироваться",
    title: "Регистрация",
    titleId: "signin-title",
    fields: [
        {
            label: "Имя",
            name: "first_name",
            type: "text",
        },
        {
            label: "Фамилия",
            name: "second_name",
            type: "text",
        },
        {
            label: "Логин",
            name: "login",
            type: "text",
        },
        {
            label: "Почта",
            name: "email",
            type: "email",
        },
        {
            label: "Пароль",
            name: "password",
            type: "password",
        },
        {
            label: "Телефон",
            name: "phone",
            type: "tel",
        },
    ],
};
