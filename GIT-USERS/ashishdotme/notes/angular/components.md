---
id: components
title: Components
---

Components are classes that interact with the html file of the component. Components uses @Component decorator. It requires template unlike directive. Constructor is auto generated in components.

This is the definition of component

```tsx
import { Component } from '@angular/core';

	@Component({
		templateUrl: './minimum.component.html' // or
		template: ''
	})
	export class MinimumComponent {}
```

## Types of communication in Components

1. Parent and child communication using @Input and @Output with EventEmitter
2. Injecting services
3. Using external library like Redux
