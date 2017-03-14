import {Injectable} from '@angular/core';
import {Todo} from "./todo";

@Injectable()
export class TodoDataService {

    // Placeholder for last id so we can simulate
    // automatic incrementing of id's
    lastId: number = 0;

    // Placeholder for todo's
    todos: Todo[] = [];

    constructor() {
    }

    /**
     * Simulate the POST to api/todos
     */
    add(todo: Todo): TodoDataService {
        if (!todo.id) {
            todo.id = ++this.lastId;
        }

        this.todos.push(todo);
        return this;
    }

    /**
     * Simulate DELETE api/todos/:id
     *
     * @param id
     * @returns {TodoDataService}
     */
    destroy(id: number): TodoDataService {
        this.todos = this.todos
            .filter(todo => todo.id !== id);
        return this;
    }

    /**
     * Simulate PUT api/todos/:id
     *
     * @param id
     * @param values
     * @returns {any}
     */
    update(id: number, values: Object = {}): Todo {
        let todo = this.find(id);
        if (!todo) {
            return null;
        }
        Object.assign(todo, values);
        return todo;
    }

    /**
     * Simulate GET api/todos
     *
     * @returns {Todo[]}
     */
    index(): Todo[] {
        return this.todos;
    }

    /**
     * Simulate GET api/todos/:id
     *
     * @param id
     * @returns {undefined|Todo}
     */
    find(id: number): Todo {
        return this.todos
            .filter(todo => todo.id === id)
            .pop();
    }

    /**
     * Toggle todo completion
     */
    toggleTodoComplete(todo: Todo) {
        let updatedTodo = this.update(todo.id, {
            complete: !todo.complete
        });
        return updatedTodo;
    }
}
