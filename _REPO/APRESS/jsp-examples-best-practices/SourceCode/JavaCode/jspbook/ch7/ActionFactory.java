package jspbook.ch7;

abstract class ActionFactory {

  public static Action createAction(String _action)
  {
    /* Return Action object */
    if (_action.equals("login")) {
      return new LoginAction();
    }
    if (_action.equals("submit")) {
      return new SubmitAction();
    }

    return null;
  }

}