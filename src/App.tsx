import * as React from "react";
import "./App.css";

interface Props {}

interface State {
	items: string[];
	value: string;
}

class App extends React.Component<Props, State> {
	state: State = {
		items: [],
		value: "",
	};

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ value: event.target.value });
	};

	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		this.setState(prevState => {
			if (prevState.value === "") {
				return undefined;
			}
			return {
				items: prevState.items.concat(prevState.value),
				value: "",
			};
		});
	};

	removeItem = (index: number) => {
		this.setState(prevState => {
			const items = prevState.items.slice();
			items.splice(index, 1);
			return { items };
		});
	};

	render() {
		return (
			<div className="app">
				<div className="app-content">
					<h1>React Todo List</h1>
					<form className="form" onSubmit={this.handleSubmit}>
						<label className="label" htmlFor="add-item">
							Add item
						</label>
						<input
							className="input"
							id="add-item"
							onChange={this.handleChange}
							type="text"
							value={this.state.value}
						/>
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
	removeItem: (index: number) => void;
}

function TodoList(props: TodoListProps) {
	if (props.items.length === 0) {
		return <p>No items</p>;
	}
	return (
		<ul className="todo-list">
			{props.items.map((item, index) => {
				return (
					<li className="todo-list-item" key={index}>
						{item}
						<button
							className="button todo-list-remove-button"
							onClick={() => props.removeItem(index)}
						>
							Remove
						</button>
					</li>
				);
			})}
		</ul>
	);
}

export default App;
