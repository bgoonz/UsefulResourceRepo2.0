export class ResourceAlert {
  success: string;
  error: string;
}

export class ResourceSettings {
  constructor(public theme: string = '', public fontSize: string = '') {}
}

export class Resource {
  static readonly types = ['book', 'video', 'blog'];

  _id: string;
  title: string;
  description: string;
  link: string;
  type: string;

  constructor({ title = '', description = '', link = '', type = '' } = {}) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.type = type;
  }
}
