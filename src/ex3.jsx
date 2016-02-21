requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {
    var data = ['Hello', 'There', 'Yael'];


    /*
     * EX3
     * */
    var ex3 = (
        <section>
            <h1>Exercise 3</h1>
            <ul>
                {
                    data.map(function (element) {
                        return <li>{element}</li>;
                    })
                }
            </ul>
        </section>
    );
    ReactDOM.render(ex3, document.getElementById('ex3'));


    /*
     * EX4
     * */
    var Ex4Section = React.createClass
    ({
        displayName: 'Ex4Section',
        render: function () {
            return (
                <section>
                    <h1>Exercise 4</h1>
                    <List items={this.props.items}/>
                </section>
            );
        }
    });

    var List = React.createClass
    ({
        displayName: 'List',
        getDefaultProps: function () {
            return {
                sortDirection: 'asc'
            };
        },
        render: function () {
            var items = _.orderBy(this.props.items, _.identity, this.props.sortDirection);
            return (
                <ul>
                    {
                        _.map(items, function (item) {
                            return <ListItem item={item}/>;
                        })
                    }
                </ul>
            )
        }
    });

    var ListItem = React.createClass
    ({
        displayName: 'ListItem',
        render: function () {
            return <li>{this.props.item}</li>
        }
    });

    var ex4 = <Ex4Section items={data}/>;
    ReactDOM.render(ex4, document.getElementById('ex4'));

    /*
     * EX5
     * */

    var SortButton = React.createClass({
        displayName: 'SortButton',
        render: function () {
            var direction = this.props.sortDirection === 'asc' ? 'down' : 'up';
            return (
                <button onClick={this.props.sortList}>
                    <i className={'fa fa-chevron-' + direction}></i>
                    <span> Sort</span>
                </button>
            )
        }
    });

    var Ex5Section = React.createClass({
        displayName: 'Ex5Section',
        getInitialState: function () {
            return {
                sortDirection: 'asc'
            };
        },
        sortList: function () {
            var sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
            this.setState({sortDirection: sortDirection});
        },
        render: function () {
            return (
                <section>
                    <h1>Exercise 5</h1>
                    <SortButton sortList={this.sortList} sortDirection={this.state.sortDirection}/>
                    <List items={this.props.items} sortDirection={this.state.sortDirection}/>
                </section>
            );
        }
    });

    var ex5 = <Ex5Section items={data}/>;
    ReactDOM.render(ex5, document.getElementById('ex5'));

});
