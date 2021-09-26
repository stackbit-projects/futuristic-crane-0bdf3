import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {classNames, getPages, Link, withPrefix} from '../utils';

export default class Portfolio extends React.Component {
    render() {
        let layout_style = _.get(this.props, 'page.layout_style', null) || 'mosaic';
        let projects_sorted = _.orderBy(getPages(this.props.pages, '/portfolio'), 'date', 'desc');
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
                <div className={'grid portfolio-feed portfolio-feed--' + layout_style}>
                  {_.map(projects_sorted, (project, project_idx) => (
                  <article key={project_idx} className="cell project-card">
                    <Link href={withPrefix(_.get(project, 'stackbit_url_path', null))} className="project-card__link">
                      {_.get(project, 'thumb_image', null) && (
                      <div className="project-card__image">
                        <img src={withPrefix(_.get(project, 'thumb_image', null))} alt={_.get(project, 'thumb_image_alt', null)} />
                      </div>
                      )}
                      <header className="project-card__header">
                        <h2 className="project-card__title">{_.get(project, 'title', null)}</h2>
                        {_.get(project, 'subtitle', null) && (
                        <div className="project-card__subtitle">
                          {_.get(project, 'subtitle', null)}
                        </div>
                        )}
                      </header>
                    </Link>
                  </article>
                  ))}
                </div>
              </div>
            </div>
            </Layout>
        );
    }
}
