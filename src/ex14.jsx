requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-with-addons-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7',
        LinkedStateMixin: '../node_modules/react-addons-linked-state-mixin/index',
        jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min"
    },
    shim: {
        jquery: {exports: '$'}
    }
});

'use strict';
requirejs(['lodash', 'react', 'reactDom', 'jquery'], function (_, React, ReactDOM, $) {

    function searchWikipedia(term, callback) {
        var cleanTerm = encodeURIComponent(term);
        var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + cleanTerm + '&callback=?';
        return $.getJSON(url).then(callback);
    }

    var throttle = _.throttle(function (value, callback) {
        searchWikipedia(value, callback)
    }, 1000);

    var App = React.createClass({

        displayName: 'App',
        getInitialState: function () {
            return {
                searchResults: []
            };
        },
        updateResults: function (res) {
            var searchResults = _.zipWith(res[1], res[3], function (name, path) {
                return {
                    name: name,
                    path: path
                };
            });
            this.setState({searchResults: searchResults})
        },
        render: function () {
            return (
                <section>
                    <p>Wikipedia Query</p>
                    <SearchQuery updateResults={this.updateResults}/>
                    <SearchResults searchResults={this.state.searchResults}/>
                </section>
            );
        }
    });


    var SearchQuery = React.createClass({
        displayName: "SearchQuery",
        onChange: function (event) {
            throttle(event.target.value, this.props.updateResults);
        },
        render: function () {

            return (
                <input type="text" onChange={this.onChange}/>
            );
        }
    });

    var SearchResults = React.createClass({
        displayName: "SearchResult",
        render: function () {
            var searchResults = this.props.searchResults;
            return (
                <ul className="wiki">
                    {
                        _.map(searchResults, function (result) {
                            return <SearchResult result={result}/>;
                        })
                    }
                </ul>
            );
        }
    });

    var SearchResult = React.createClass({
        displayName: "SearchResult",
        render: function () {
            var resultObj = this.props.result;
            return (
                <li key={Date.now()}>
                    <a href={resultObj.path}>{resultObj.name}</a>
                </li>
            );
        }
    });


    ReactDOM.render(<App />, document.getElementById('main'));

});
