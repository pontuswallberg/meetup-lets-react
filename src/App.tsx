import * as React from "react";
import "./App.css";

interface Props {}

interface State {
	items: string[];
}

class App extends React.Component<Props, State> {
	state: State = {
		items: [],
	};

	additem = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const input = event.currentTarget.elements["add-item"];
		const value = input.value;
		if (value !== "") {
			this.setState(
				prevState => ({
					items: [...prevState.items, value],
				}),
				() => {
					input.value = "";
				}
			);
		}
	};

	removeItem = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const parent = event.currentTarget.parentElement;
		if (parent !== null) {
			const index = parent.getAttribute("data-index");
			if (index !== null) {
				const items = this.state.items.slice();
				items.splice(parseInt(index, 10), 1);
				this.setState({ items: items });
			}
		}
	};

	render() {
		return (
			<div className="app">
				<div className="app-content">
					<h1>React Todo List</h1>
					<form className="form" onSubmit={this.additem}>
						<label className="label" htmlFor="add-item">
							Add item
						</label>
						<input className="input" name="add-item" id="add-item" type="text" />
						<button className="button button-submit" type="submit">
							Add
						</button>
					</form>

					<h2>Todos</h2>
					<TodoList items={this.state.items} removeItem={this.removeItem} />
				</div>
			</div>
		);
	}
}

interface TodoListProps {
	items: string[];
	removeItem: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function TodoList(props: TodoListProps) {
	if (props.items.length === 0) {
		return <p>No items</p>;
	}

	return (
		<ul className="todo-list">
			{props.items.map((item, index) => (
				<li className="todo-list-item" data-index={index} key={index}>
					{item}
					<button className="button todo-list-remove-button" onClick={props.removeItem}>
						Remove
					</button>
				</li>
			))}
		</ul>
	);
}

export default App;
