class _MeetupTitle extends StatelessWidget {
  final AuthApiService auth = AuthApiService();
  Widget _buildUserWelcome() {
    return FutureBuilder<bool>(
        future: auth.isAuthenticated(),
        builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
          if (snapshot.hasData && snapshot.data) {
            final user = auth.authUser;
            Widget userAvatar;
            if (user != null && user.avatar != null) {
              userAvatar = CircleAvatar(backgroundImage: NetworkImage(user.avatar));
            } else {
              userAvatar = Container(width: 0, height: 0);
            }
            return Container(
                margin: EdgeInsets.only(top: 10),
                child: Row(children: <Widget>[
                  userAvatar,
                  Text("Welcome ${user.username}!"),
                  Spacer(),
                  GestureDetector(
                    onTap: () {
                      auth.logout().then((isLogout) =>
                          Navigator.pushNamedAndRemoveUntil(context, '/login',
                              (Route<dynamic> route) => false));
                    },
                    child: Text(
                      "Logout",
                      style: TextStyle(color: Theme.of(context).primaryColor),
                    ),
                  ),
                ]));
          } else
            return Container(width: 0, height: 0);
        });
  }