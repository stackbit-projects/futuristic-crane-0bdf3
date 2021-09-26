import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {withPrefix, markdownify} from '../utils';

export default class Page extends React.Component {
    render() {
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
            </article>
            </Layout>
        );
    }
}
