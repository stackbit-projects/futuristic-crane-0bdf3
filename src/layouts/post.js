import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {withPrefix, markdownify, getPages} from '../utils';
import BlogFeedItem from '../components/BlogFeedItem';

export default class Post extends React.Component {
    render() {
        let posts_sorted = _.orderBy(getPages(this.props.pages, '/blog'), 'date', 'desc');
        let post_item_len = _.size(posts_sorted);
        return (
            <Layout {...this.props}>
            <article className="post">
              <header className="post__header">
                <div className="container container--md">
                  <h1 className="post__title line-top">{_.get(this.props, 'page.title', null)}</h1>
                  {_.get(this.props, 'page.subtitle', null) && (
                  <div className="post__subtitle">
                    {_.get(this.props, 'page.subtitle', null)}
                  </div>
                  )}
                </div>
              </header>
              {_.get(this.props, 'page.image', null) && (
              <div className="post__image">
                <div className="container container--lg">
                  <img src={withPrefix(_.get(this.props, 'page.image', null))} alt={_.get(this.props, 'page.image_alt', null)} />
                </div>
              </div>
              )}
              <div className="post__body text-block">
                <div className="container container--md">
                  {markdownify(_.get(this.props, 'page.content', null))}
                </div>
              </div>
              <footer className="post__meta">
                <div className="container container--md">
                  Posted on <time className="published" dateTime={moment(_.get(this.props, 'page.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'page.date', null)).strftime('%B %d, %Y')}</time>
                </div>
              </footer>
            </article>
            {
            _.map(posts_sorted, (post_item, post_item_idx) => (
              (_.get(post_item, 'stackbit_url_path', null) === _.get(this.props, 'page.stackbit_url_path', null)) && ((() => {
                  let curr_index = post_item_idx;
                  let next_index = curr_index + 1;
                  let prev_index = curr_index - 1;
                  let post_index_length = post_item_len - 1;
                  return (
                    (post_index_length > 0) && (
                    <nav key={post_item_idx} className="section section--posts">
                      <div className="container container--lg">
                        <h2 className="section__title line-top">Read Next</h2>
                        <div className="grid post-feed post-feed--col-two">
                          {(curr_index !== 0) && ((() => {
                              let prev_post = posts_sorted[prev_index];
                              return (
                                <BlogFeedItem {...this.props} post_page={prev_post} />
                              );
                          })())}
                          {(curr_index < post_index_length) && ((() => {
                              let next_post = posts_sorted[next_index];
                              return (
                                <BlogFeedItem {...this.props} post_page={next_post} />
                              );
                          })())}
                        </div>
                      </div>
                    </nav>
                    )
                  );
              })())
            ))}
            </Layout>
        );
    }
}
