import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {classNames, getPages, Link, withPrefix} from '../utils';

export default class Blog extends React.Component {
    render() {
        let col_number = _.get(this.props, 'page.col_number', null) || 'three';
        let posts_sorted = _.orderBy(getPages(this.props.pages, '/blog'), 'date', 'desc');
        return (
            <Layout {...this.props}>
            <header className={classNames('section', 'section--header', {'screen-reader-text': _.get(this.props, 'page.hide_title', null)})}>
              <div className="container container--lg">
                <h1 className="section__title line-top">{_.get(this.props, 'page.title', null)}</h1>
                {_.get(this.props, 'page.subtitle', null) && (
                <p className="section__subtitle">{_.get(this.props, 'page.subtitle', null)}</p>
                )}
              </div>
            </header>
            <div className="section section--portfolio">
              <div className="container container--lg">
                <div className={'grid post-feed post-feed--col-' + col_number}>
                  {_.map(posts_sorted, (post, post_idx) => (
                  <article key={post_idx} className="cell post-card">
                    {_.get(post, 'thumb_image', null) && (
                    <Link className="post-card__image" href={withPrefix(_.get(post, 'stackbit_url_path', null))}>
                      <img src={withPrefix(_.get(post, 'thumb_image', null))} alt={_.get(post, 'thumb_image_alt', null)} />
                    </Link>
                    )}
                    <header className="post-card__header">
                      <h2 className="post-card__title"><Link href={withPrefix(_.get(post, 'stackbit_url_path', null))}>{_.get(post, 'title', null)}</Link></h2>
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
                  ))}
                </div>
              </div>
            </div>
            </Layout>
        );
    }
}
