import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Link, withPrefix} from '../utils';

export default class BlogFeedItem extends React.Component {
    render() {
        let post = _.get(this.props, 'post_page', null);
        return (
            <article className="cell post-card">
              {_.get(post, 'thumb_image', null) && (
              <Link className="post-card__image" href={withPrefix(_.get(post, 'stackbit_url_path', null))}>
                <img src={withPrefix(_.get(post, 'thumb_image', null))} alt={_.get(post, 'thumb_image_alt', null)} />
              </Link>
              )}
              <header className="post-card__header">
                <h3 className="post-card__title"><Link href={withPrefix(_.get(post, 'stackbit_url_path', null))}>{_.get(post, 'title', null)}</Link></h3>
                <div className="post-card__meta">
                  <time className="published" dateTime={moment(_.get(post, 'date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'date', null)).strftime('%B %d, %Y')}</time>
                </div>
              </header>
              {_.get(post, 'excerpt', null) && (
              <p className="post-card__body">
                {_.get(post, 'excerpt', null)}
              </p>
              )}
            </article>
        );
    }
}
