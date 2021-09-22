import 'config.dart';

class BaseConfig implements Config {
  Map<String, String> headers;

  BaseConfig() {
    headers = {
      "Content-Type": "application/json"
    };
  }
}
