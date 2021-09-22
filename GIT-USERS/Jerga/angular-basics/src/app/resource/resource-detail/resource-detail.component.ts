import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource } from '../shared/resource.model';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
})
export class ResourceDetailComponent implements OnInit {
  resource: Resource;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this.getResource(id);
    });
  }

  private getResource(id: string) {
    this.resourceService
      .getResourceById(id)
      .subscribe((resource) => (this.resource = resource));
  }
}
