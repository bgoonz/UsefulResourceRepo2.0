import 'package:flutter_test/flutter_test.dart';
import '../lib/src/config.dart';
import '../lib/src/base_config.dart';
import '../lib/src/base_interceptor.dart';
import '../lib/f_http.dart';

void main() {
  group('Base Tests', () {
    test('sets config', () {
      var config = BaseConfig();
      expect(config.headers['Content-Type'], equals("application/json"));
    });

    test('sets custom header', () {
      var interceptors = BaseInterceptor();
      var config = BaseConfig();
      interceptors.request.use((Config config) {
        config.headers['My-Custom-Header-Key'] = 'My-Custom-Header-Value';
        return config;
      });

      interceptors.request.configure(config);

      expect(config.headers['My-Custom-Header-Key'], equals("My-Custom-Header-Value"));
    });

    test('req', () async {
      var service = HttpService.create({'baseURL': 'http://localhost:3001'});

      service.interceptors.request.use((config) async {
        var a = Future.value(5);
        return config;
      });

      var res = await service.get('/api/v1/meetups');
      expect(res.statusCode, equals(200));
    });
  });
}
