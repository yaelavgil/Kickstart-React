requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

'use strict';
requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {


    var App = React.createClass({

        displayName: 'App',
        getInitialState: function () {
            return {
                tasks: {},
                filterBy: ""
            };
        },
        addTask: function (task) {
            var timestamp = Date.now();
            this.state.tasks['task-' + timestamp] = task;
            this.setState({tasks: this.state.tasks, filterBy: ""});
        },
        deleteTask: function (key) {
            delete this.state.tasks[key];
            this.setState({tasks: this.state.tasks});
        },
        filter: function (value) {
            this.setState({filterBy: value});
        },
        render: function () {
            return (
                <section>
                    <AddTaskForm addTask={this.addTask} filter={this.filter}/>
                    <TasksList tasks={this.state.tasks} filterByValue={this.state.filterBy} deleteTask={this.deleteTask}
                               insertFirst={true}/>
                </section>
            );
        }
    });

    var AddTaskForm = React.createClass({
        displayName: "AddTaskForm",
        createTask: function (event) {
            event.preventDefault();
            var task = {
                value: this.refs.taskInput.value
            };
            this.props.addTask(task);
            this.refs.form.reset();
        },
        inputChangeHandler: function (event) {
            this.props.filter(event.target.value);
        },
        render: function () {
            return (
                <form ref="form">
                    <input type="text" ref="taskInput" placeholder="Add new task" onChange={this.inputChangeHandler}/>
                    <button onClick={this.createTask}>+ Add Task</button>
                </form>
            );
        }
    });

    var TasksList = React.createClass({
        displayName: 'TasksList',
        renderTask: function (key) {
            return (
                <TaskWrapper key={key} index={key} value={this.props.tasks[key].value} deleteTask={this.props.deleteTask}/>
            );
        },
        filterBy: function (task) {
            return _.startsWith(task.value, this.props.filterByValue);
        },
        render: function () {
            var tasks = this.props.tasks;

            var filterTasks = tasks;
            if (this.props.filterByValue) {
                filterTasks = _.pickBy(tasks, this.filterBy);
            }

            var keysArr = Object.keys(filterTasks);
            if (this.props.insertFirst) {
                keysArr = _.orderBy(keysArr, _.identity, 'desc')
            }

            return (
                <ul>
                    {keysArr.map(this.renderTask)}
                </ul>
            );
        }
    });

    var TaskWrapper = React.createClass({
        displayName: 'TaskWrapper',
        render: function () {
            var key = this.props.index;
            return (
                <div>
                    <Task index={key} ref="task" value={this.props.value}/>
                    <DeleteButton index={key} deleteTask={this.props.deleteTask}/>
                </div>
            );
        }
    });

    var DeleteButton = React.createClass({
        displayName: 'DeleteButton',
        deleteHandler: function () {
            this.props.deleteTask(this.props.index);
        },
        render: function () {
            return (
                <button onClick={this.deleteHandler}>Delete</button>
            );
        }
    });

    var Task = React.createClass({
        displayName: 'Task',
        onTaskClick: function (event) {
            var classList = event.target.classList;
            if (classList.contains('checked')) {
                classList.remove('checked');
            } else {
                classList.add('checked');
            }
        },
        render: function () {
            return (
                <li className="taskItem" onClick={this.onTaskClick}>{this.props.value}</li>
            );
        }
    });


    ReactDOM.render(<App />, document.getElementById('ex8'));

});
