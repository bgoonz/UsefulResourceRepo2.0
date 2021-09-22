import 'package:http/http.dart';
import 'package:http/http.dart' as http;
import 'interceptor.dart';
import 'base_interceptor.dart';
import 'base_config.dart';

class HttpService {
   final _client = http.Client();
   String _baseURL = '';
   Interceptor interceptors = BaseInterceptor();

  HttpService.create(Map<String, dynamic> options) {
    _configure(options);
  }

  void _applyHeaders(BaseConfig config, Map<String, String> headers) {
    if (headers != null) {
        headers.forEach((String key, String value) {
        config.headers[key] = value;
      });
    }
  }

  String _buildUrl(url) {
    if (_baseURL.length > 0) {
      return _baseURL + url;
    }

    return url;
  }

  _configure(Map<String, dynamic> options) {
    if (options != null) {
      _baseURL = options['baseURL'] ?? '';
    }
  }

  Future<BaseConfig> _setup(headers) async {
    final config = await interceptors.request.configure(BaseConfig());
    _applyHeaders(config, headers);
    return config;
  }

  Future<Response> get(dynamic url, {Map<String, String> headers}) async {
    final config = await _setup(headers);
    try {
      return _client.get(_buildUrl(url), headers: config.headers);
    } catch(e) {
      return e;
    }
  }

  Future<Response> post(dynamic url, {Map<String, String> headers, dynamic body}) async {
    final config = await _setup(headers);
    return _client.post(_buildUrl(url), headers: config.headers, body: body);
  }
}
