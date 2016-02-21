requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-with-addons-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7',
        LinkedStateMixin: '../node_modules/react-addons-linked-state-mixin/index'
    }
});

'use strict';
requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    var App = React.createClass({

        mixins: [React.addons.LinkedStateMixin],
        displayName: 'App',
        getInitialState: function () {
            return {
            };
        },
        render: function () {
            return (
                <section>
                    <Input valueLink={this.linkState('value')} />
                    <hr />
                    <Output value={this.state.value} />
                </section>
            );
        }
    });


    var Input = React.createClass({
        displayName: "Input",
        render: function () {
            return (
                <input type="number" valueLink={this.props.valueLink} />
            );
        }
    });

    var Output = React.createClass({
        displayName: "Output",
        render: function () {
            var value = this.props.value;
            var doubleValue = value * 2 || "";
            return (
                <h1>{doubleValue}</h1>
            );
        }
    });


    ReactDOM.render(<App />, document.getElementById('ex8'));

});
