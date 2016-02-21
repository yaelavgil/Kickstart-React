requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-with-addons-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7',
        ReactRouter: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter',
    }
});

'use strict';
requirejs(['lodash', 'react', 'reactDom', 'ReactRouter'],
    function (_, React, ReactDOM, ReactRouter) {

        var Router = ReactRouter.Router;
        var Route = ReactRouter.Route;
        var Link = ReactRouter.Link;

        var App = React.createClass({
            displayName: 'App',

            addUser: function (email, password) {
                var users = localStorage.getItem("users");
                var parsedUsers = {};
                if (users) {
                    parsedUsers = JSON.parse(users);
                }
                parsedUsers[email] = password;
                localStorage.setItem("users", JSON.stringify(parsedUsers));
            },
            success: function (email) {
                this.email = email;
            },
            getEmail: function () {
                return this.email;
            },
            render: function () {
                return (
                    <Router>
                        <Route path="/" component={Login} onSuccess={this.success}/>
                        <Route path="/signup" component={Signup} addUser={this.addUser} onSuccess={this.success}/>
                        <Route path="/success" component={Success} getEmail={this.getEmail}/>
                    </Router>
                );
            }
        });

        var Success = React.createClass({
            mixins: [ReactRouter.History],
            displayName: "Success",
            render: function () {
                return (
                    <section>
                        <h1>Welcome {this.props.routes[0].getEmail()}</h1>
                        <Link to="/">Sign-Out</Link>
                    </section>
                );
            }
        });

        var Login = React.createClass({
            displayName: "Login",
            render: function () {
                return (
                    <section>
                        <LoginHeader />
                        <LoginForm onSuccess={this.props.routes[0].onSuccess}/>
                        <LoginFooter />
                    </section>
                );
            }
        });

        var LoginHeader = React.createClass({
            displayName: "LoginHeader",
            render: function () {
                return (
                    <header>
                        <img src="src/images/wix-icon1.png" alt="wix-logo" width="150px"/>
                        <h1>Kick-Mark</h1>
                    </header>
                );
            }
        });

        var LoginFooter = React.createClass({
            displayName: "LoginFooter",
            render: function () {
                return (
                    <footer>
                        <h4>Don't have an account? <SignupLink /></h4>
                    </footer>
                );
            }
        });

        var SignupLink = React.createClass({
            displayName: "SignupLink",
            render: function () {
                return (
                    <Link to="/signup">Sign Up</Link>
                );
            }
        });

        var LoginForm = React.createClass({
            mixins: [ReactRouter.History],
            displayName: "LoginForm",
            onLogin: function (event) {
                event.preventDefault();
                var email = this.refs.email.getValue();
                var password = this.refs.pass.getValue();
                var users = JSON.parse(localStorage.getItem("users"));
                if (users[email] && users[email] === password) {
                    this.props.onSuccess(email);
                    this.history.push('/success');
                } else {
                    this.refs.alert.classList.add("pass-dont-match");
                    this.refs.alert.classList.remove("hide");
                }
            },
            render: function () {
                return (
                    <form onSubmit={this.onLogin} className="login-form">
                        <ul className="style-less-list">
                            <li><EmailInput ref="email"/></li>
                            <li><PasswordInput ref="pass"/></li>
                        </ul>
                        <button className="login" type="submit">Login</button>
                        <p ref="alert" className="hide">The email and password do not match!</p>
                    </form>
                );
            }
        });

        var EmailInput = React.createClass({
            displayName: "EmailInput",
            getValue: function () {
                return this.refs.email.value;
            },
            render: function () {
                return (
                    <input ref="email" type="email" placeholder="Email" require autofocus/>
                );
            }
        });

        var PasswordInput = React.createClass({
            displayName: "PasswordInput",
            getValue: function () {
                return this.refs.input.value;
            },
            render: function () {
                var placeholder = this.props.placeholder || "Password";
                return (
                    <input ref="input" type="text" placeholder={placeholder} pattern="^(?=.*\d)(?=.*[a-zA-Z]).{6}$"
                           required/>
                );
            }
        });


        var Signup = React.createClass({
            displayName: "Signup",
            render: function () {
                return (
                    <section>
                        <SignupHeader />
                        <SignupForm addUser={this.props.routes[0].addUser} onSuccess={this.props.routes[0].onSuccess}/>
                        <SignupFooter />
                    </section>
                );
            }
        });


        var SignupHeader = React.createClass({
            displayName: "LoginHeader",
            render: function () {
                return (
                    <header>
                        <img src="src/images/wix-icon1.png" alt="wix-logo" width="150px"/>
                        <h1>Kick-Mark</h1>
                        <h2>Sign-Up</h2>
                    </header>
                );
            }
        });

        var SignupFooter = React.createClass({
            displayName: "LoginFooter",
            render: function () {
                return (
                    <footer>
                        <h4>Already have an account? <LoginLink /></h4>
                    </footer>
                );
            }
        });

        var LoginLink = React.createClass({
            displayName: "LoginLink",
            render: function () {
                return (
                    <Link to="/">Login</Link>
                );
            }
        });

        var SignupForm = React.createClass({
            mixins: [ReactRouter.History],
            displayName: "SignUpForm",
            onSignup: function (event) {
                event.preventDefault();
                var password = this.refs.pass.getValue();
                var isPasswordsMatch = password === this.refs.passConf.getValue();
                if (!isPasswordsMatch) {
                    this.refs.alert.classList.add("pass-dont-match");
                    this.refs.alert.classList.remove("hide");
                    //alert("password don't match");
                } else {
                    var email = this.refs.email.getValue();
                    this.props.addUser(email, password);
                    this.props.onSuccess(email);
                    this.history.push('/success');
                }
            },
            render: function () {
                return (
                    <form onSubmit={this.onSignup} className="signup-form">
                        <ul className="style-less-list">
                            <li><EmailInput ref="email"/></li>
                            <li><PasswordInput ref="pass"/></li>
                            <li><PasswordInput ref="passConf" placeholder="Confirm Password"/></li>
                        </ul>
                        <button className="signup" type="submit">Signup</button>
                        <p ref="alert" className="hide">Passwords don't match</p>
                    </form>
                );
            }
        });

        ReactDOM.render(<App />, document.getElementById('main'));

    });
