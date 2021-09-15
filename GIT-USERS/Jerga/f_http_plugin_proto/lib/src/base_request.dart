import 'request.dart';
import 'config.dart';

class BaseRequest implements Request {
  dynamic Function(Config) configure = (Config config) => config;

   void use(configFunction) {
     this.configure = configFunction;
   }
}
