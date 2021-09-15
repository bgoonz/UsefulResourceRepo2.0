import 'interceptor.dart';
import 'request.dart';
import 'base_request.dart';

class BaseInterceptor extends Interceptor {
  Request request;

  BaseInterceptor() {
    request = BaseRequest();
  }
}
