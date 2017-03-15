import {Component} from '@angular/core';
import {TodoDataService} from "./todo-data.service";
import {Todo} from "./todo";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TodoDataService]
})
export class AppComponent {

    newTodo: Todo = new Todo();

    constructor(private todoDataService: TodoDataService) {
    }

    add() {
        console.log('add the todo');
        this.todoDataService.add(this.newTodo);
        this.newTodo = new Todo();
    }

    toggleTodoComplete(todo) {
        this.todoDataService.toggleTodoComplete(todo);
    }

    destroy(todo) {
        this.todoDataService.destroy(todo.id);
    }

    get todos() {
        return this.todoDataService.index();
    }
}
