import Block from "@src/core/Block";

type ExampleProps = {
	buttonName?: string;
};

export class Example extends Block<ExampleProps> {
	protected template = `
    <form>
      {{{ Input type="text" placeholder="Логин" ref="login" }}}
      {{{ Input type="password" placeholder="Пароль" ref="password" }}}
      {{{ Button label="Авторизация" }}}
    </form>
  `;

	protected events = {
		submit: (event: Event) => {
			event.preventDefault();

			const login = this.refs.login;
			const password = this.refs.password;

			if (
				login instanceof HTMLInputElement &&
				password instanceof HTMLInputElement
			) {
				console.log(login.value);
				console.log(password.value);
			}
		},
	};

	componentDidMount() {
		setTimeout(
			() => this.setProps({ buttonName: "Клик через 3 секунды!" }),
			3000,
		);
	}
}
