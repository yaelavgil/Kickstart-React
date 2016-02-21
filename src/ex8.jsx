requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7',
        moment: '../node_modules/moment/moment'
    }
});

'use strict';
requirejs(['lodash', 'react', 'reactDom', 'moment'], function (_, React, ReactDOM, moment) {


    var App = React.createClass({

        displayName: 'App',
        getInitialState () {
            return {
                value: "",
                bold: false,
                italic: false
            };
        },
        changeBoldStyle: function(event) {
            var bold = event.target.checked === true ? true : false;
            this.setState({bold: bold});
        },
        changeItalicStyle: function(event) {
            var italic = event.target.checked === true ? true : false;
            this.setState({italic: italic});
        },
        onInputChange: function (value) {
            this.setState({value: value});
        },
        render: function () {
            var outputClassList = "normal";
            if (this.state.bold === true) {
                outputClassList += " bold";
            }
            if (this.state.italic === true) {
                outputClassList += " italic";
            }
            return (
                <section>
                    <Input onInputChange={this.onInputChange} /><br />
                    <input onChange={this.changeBoldStyle} type="checkbox" name="bold" value="bold" />Bold<br />
                    <input onChange={this.changeItalicStyle} type="checkbox" name="italic" value="italic" />Italic<br />
                    <hr />
                    <Output text={this.state.value} classList={outputClassList} />
                </section>
            );
        }
    });

    var Input = React.createClass({
        displayName: 'Input',
        onChange: function (event) {
            this.props.onInputChange(event.target.value);
        },
        render: function () {
            return (
              <input onChange={this.onChange} type="text" placeholder="write your text here" />
            );
        }
    });

    var Output = React.createClass({
        displayName: 'Output',
        render: function () {
            console.log("classList: " + this.props.classList);
            return (
                <h1 className={this.props.classList}>{this.props.text}</h1>
            );
        }
    });


    ReactDOM.render(<App text="" style={{}} />, document.getElementById('ex7'));

});
