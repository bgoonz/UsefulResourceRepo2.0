(function foo(){bar = 10; var bar = 20;}());
alert(bar) // ReferenceError: bar is not defined
(function foo(){bar = 10;}());
alert(bar) // 10