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
                tasks: {}
            };
        },
        addTask: function (task) {
            var timestamp = (new Date()).getTime();
            this.state.tasks['task-' + timestamp] = task;
            this.setState({ tasks: this.state.tasks });
        },
        render: function () {
            return (
                <section>
                    <AddTaskForm addTask={this.addTask} />
                    <TasksList tasks={this.state.tasks} insertFirst={true} />
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
        render: function () {
            return (
                <form ref="form">
                    <input type="text" ref="taskInput" placeholder="Add new task" />
                    <button onClick={this.createTask}>+ Add Task</button>
                </form>
            );
        }
    });

    var TasksList = React.createClass({
        displayName: 'TasksList',
        renderTask: function (key) {
            return <Task key={key} index={key} value={this.props.tasks[key].value} />;
        },
        render: function () {
            var keysArr = Object.keys(this.props.tasks);
            if(this.props.insertFirst) {
                keysArr = _.orderBy(keysArr, _.identity, 'desc')
            }
            return (
                <ul>
                    {keysArr.map(this.renderTask)}
                </ul>
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
