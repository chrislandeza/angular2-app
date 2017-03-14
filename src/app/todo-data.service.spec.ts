import {TestBed, async, inject} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoDataService} from './todo-data.service';

describe('TodoDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TodoDataService]
        });
    });

    it('should ...', inject([TodoDataService], (service: TodoDataService) => {
        expect(service).toBeTruthy();
    }));

    describe('#index()', () => {

        it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
            expect(service.index()).toEqual([]);
        }));

        it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});
            service.add(todo1);
            service.add(todo2);
            expect(service.index()).toEqual([todo1, todo2]);
        }));

    });

    describe('#save(todo)', () => {

        it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});
            service.add(todo1);
            service.add(todo2);
            expect(service.find(1)).toEqual(todo1);
            expect(service.find(2)).toEqual(todo2);
        }));

    });

    describe('#destroy(id)', () => {

        it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});
            service.add(todo1);
            service.add(todo2);
            expect(service.index()).toEqual([todo1, todo2]);
            service.destroy(1);
            expect(service.index()).toEqual([todo2]);
            service.destroy(2);
            expect(service.index()).toEqual([]);
        }));

        it('should not removing anything if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});
            service.add(todo1);
            service.add(todo2);
            expect(service.index()).toEqual([todo1, todo2]);
            service.destroy(3);
            expect(service.index()).toEqual([todo1, todo2]);
        }));

    });

    describe('#update(id, values)', () => {

        it('should return todo with the corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
            let todo = new Todo({title: 'Hello 1', complete: false});
            service.add(todo);
            let updatedTodo = service.update(1, {
                title: 'new title'
            });
            expect(updatedTodo.title).toEqual('new title');
        }));

        it('should return null if todo is not found', inject([TodoDataService], (service: TodoDataService) => {
            let todo = new Todo({title: 'Hello 1', complete: false});
            service.add(todo);
            let updatedTodo = service.update(2, {
                title: 'new title'
            });
            expect(updatedTodo).toEqual(null);
        }));

    });

    describe('#toggleTodoComplete(todo)', () => {

        it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
            let todo = new Todo({title: 'Hello 1', complete: false});
            service.add(todo);
            let updatedTodo = service.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(true);
            service.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(false);
        }));

    });

});
