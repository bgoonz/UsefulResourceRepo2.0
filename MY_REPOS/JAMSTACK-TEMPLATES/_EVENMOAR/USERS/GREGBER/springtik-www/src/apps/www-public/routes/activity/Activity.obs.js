import {watchTask} from '~/modules/observables/operator/watchTask';
import {filter} from 'rxjs/operator/filter';
import {combineLatest} from 'rxjs/operator/combineLatest';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {publishReplay} from 'rxjs/operator/publishReplay';
import {map} from 'rxjs/operator/map';
import gql from '~/apps/www-public/graphQLClient';
import {parseLink} from '~/modules/activity/link';

export default () => ({props$}) => {
  const pathname$ = props$
    ::map(({
      location: {
        pathname,
      },
    }) => pathname)
    ::distinctUntilChanged();

  const result$ = pathname$
    ::map(pathname => {
      const parts = parseLink(pathname);
      return parts ? parts.id : null;
    })
    ::distinctUntilChanged()
    ::filter(id => id)
    ::watchTask(id => {
      return gql.fetch({
        query: `
          {
            activity(id: "${id}") {
              id
              name
              description
              text
              website
              phoneNumber
              link
              cover {
                publicId
              }
              position {
                lat
                lng
              },
              siblings {
                id
                name
                link
                cover {
                  publicId
                }
              }
            }
          }
        `,
      });
    })
    ::publishReplay(1).refCount();

  const activity$ = result$
    ::filter(({output}) => output && output.data)
    ::map(({output}) => output.data.activity);

  const pending$ = result$
    ::map(({progress}) => !!progress);

  const redirect$ = pathname$
    ::combineLatest(activity$, (pathname, activity) => {
      const linkParts = parseLink(pathname);
      if (!linkParts || linkParts.id !== activity.id)
        return null;
      return activity.link !== pathname ? activity.link : null;
    });

  return {
    activity$,
    redirect$,
    pending$,
  };
};
