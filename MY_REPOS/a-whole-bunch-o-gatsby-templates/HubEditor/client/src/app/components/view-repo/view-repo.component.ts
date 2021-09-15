import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { IRepoContentState } from '../../store/models/repo-files.model';

@Component({
  selector: 'app-view-repo',
  templateUrl: './view-repo.component.html',
  styleUrls: ['./view-repo.component.styl']
})
export class ViewRepoComponent implements OnInit {
  @HostBinding('class')
  className = 'f r';

  user: string;
  repo: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.user = paramMap.get('user');
      this.repo = paramMap.get('repo');
    });
  }

}
