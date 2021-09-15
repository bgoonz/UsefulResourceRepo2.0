class LoginScreen extends StatefulWidget {
  static String route = "/login";
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
    final GlobalKey<FormFieldState<String>> _passwordKey =
        GlobalKey<FormFieldState<String>>();
    final GlobalKey<FormFieldState<String>> _emailKey =
        GlobalKey<FormFieldState<String>>();

    final _emailController = TextEditingController();
    final _passwordController = TextEditingController();

    LoginFormData _loginData = LoginFormData();

    bool _autoValidate = false;
    @override
    initState() {
      super.initState();
//      _emailController.addListener(() {
//        print(_emailController.text);
//      });
    }

    @override
    dispose() {
      _emailController.dispose();
      _passwordController.dispose();
      super.dispose();
    }

    _submit() {
      final form = _formKey.currentState;
      if (form.validate()) {
        form.save();
        print(
            "password is ${_loginData.password}, email is ${_loginData.email}");
      }else{
        setState(() =>
          _autoValidate = true
        );
        print("Autovalidate=true");
      }
    }

    Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("LOGIN"),
      ),
      body: Padding(
        padding: EdgeInsets.all(20.0),
        child: Form(
          key: _formKey,
          autovalidate: _autoValidate,
          // Provide key
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: EdgeInsets.only(bottom: 15.0),
                  child: Text(
                    'Login And Explore',
                    style:
                        TextStyle(fontSize: 30.0, fontWeight: FontWeight.bold),
                  ),
                ),
                TextFormField(
                  key: _emailKey,
                  style: Theme.of(context).textTheme.headline5,
                  validator: (value) {
                    if (value.isEmpty) {
                      return "Please enter an email";
                    }
                    if(value.length < 8){
                      return "Minimum length is 8 characters";
                    }
                  },
                  onSaved: (value) => _loginData.email = value,
                  decoration: InputDecoration(
                    hintText: "Email Address",
                  ),
                ),
                TextFormField(
                  key: _passwordKey,
                  style: Theme.of(context).textTheme.headline5,
                  validator: (value) {
                    if (value.isEmpty) {
                      return "Please enter a password";
                    }
                    if(value.length < 8){
                      return "Minimum length is 8 characters";
                    }
                  },
                  onSaved: (value) => _loginData.password = value,
                  decoration: InputDecoration(hintText: "Password"),
                ),
                _buildLinks(),
                Container(
                  alignment: Alignment(-1.0, 0.0),
                  margin: EdgeInsets.only(top: 10.0),
                  child: RaisedButton(
                    textColor: Colors.white,
                    color: Theme.of(context).primaryColor,
                    child: const Text('Submit'),
                    onPressed: _submit,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLinks() {
    return Padding(
      padding: EdgeInsets.only(top: 10, bottom: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          GestureDetector(
            onTap: () => Navigator.pushNamed(context, RegisterScreen.route),
            child: Text(
              "Sign Up Now",
              style: TextStyle(
                color: Theme.of(context).primaryColor,
              ),
            ),
          ),
          GestureDetector(
            onTap: () => Navigator.pushNamed(context, MeetUpHomeScreen.route),
            child: Text(
              "Continue to Home Page",
              style: TextStyle(
                color: Theme.of(context).primaryColor,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
