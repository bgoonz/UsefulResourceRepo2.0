import 'config.dart';

abstract class Request {
  dynamic Function(Config) configure;

   void use(dynamic Function(Config) configFunction);
}
