package jspbook.framework.request;

import jspbook.framework.logging.Logger;

/**
 * Factory class for Action objects
 *
 * <p>Generates an object that implements the
 * Action interface. The createAction method is
 * called from the ReqUtility object to instantiate
 * an Action object to handle a web request.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

abstract class ActionFactory {

  /**
   * Instantiate and return the appropriate
   * Action object
   */
  public static Action createAction(String _actionClass)
  {
    Class actionObj = null;
    Action action = null;
    try {
      actionObj = Class.forName(_actionClass);
      action = (Action) actionObj.newInstance();
    }
    catch (Exception e) {
      Logger.log(Logger.ERROR, e.toString());
    }

    return action;
  }

}
