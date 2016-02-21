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

    function formatTime (time) {
        function formatTimeNumber(num) {
            return num < 10 ? "0" + num : num;
        }
        var hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
        var ampm = time.getHours() > 12 ? "pm" : "am";
        var minutes = formatTimeNumber(time.getMinutes());
        var seconds = formatTimeNumber(time.getSeconds());
        return hours + ":" + minutes + ":" + seconds + " " + ampm;
    }

    var Clock = React.createClass({
        displayName: 'Clock',
        render: function () {
            return (
                <section>
                    <h1>Time is: <span>{this.props.currTime}</span></h1>
                </section>
            )
        }
    });

    window.setInterval(function() {
        var currentDate = new Date();
        //var currTime = formatTime(currentDate);
        var currTime = moment().format('h:mm:ss a');
        ReactDOM.render(<Clock currTime={currTime}/>, document.getElementById('ex6'));
    }, 1000);

    //ReactDOM.render(<Clock />, document.getElementById('ex6'));

});
