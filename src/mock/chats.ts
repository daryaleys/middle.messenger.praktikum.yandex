export const chats = [
    {
        id: 1,
        title: "Приветственный чат",
        avatarUrl: "",
        unreadCount: 2,
        lastMessage: {
            author: "Бот",
            text: "Добро пожаловать!",
            time: "09:20",
        },
        members: [{ name: "Бот", avatarUrl: "" }],
    },
    {
        id: 2,
        title: "Вадим",
        avatarUrl: "",
        isActive: true,
        lastMessage: {
            author: "Я",
            text: "Круто!",
            time: "12:00",
        },
        members: [
            { name: "Вадим", avatarUrl: "" },
            { name: "Я", avatarUrl: "" },
        ],
    },
];

export const activeChat = {
    title: "Вадим",
    date: "19 июня",
    messages: [
        {
            id: 1,
            author: "Вадим",
            text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            time: "11:56",
            isOwn: false,
        },
        {
            id: 2,
            author: "Вадим",
            imageUrl: "/images/hasselblad-moon-camera.png",
            imageAlt: "Камера Hasselblad для лунной программы",
            time: "11:56",
            isOwn: false,
        },
        {
            id: 3,
            author: "Я",
            text: "Круто!",
            time: "12:00",
            isOwn: true,
        },
    ],
};
