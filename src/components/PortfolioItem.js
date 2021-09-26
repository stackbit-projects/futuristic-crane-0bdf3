import React from 'react';
import _ from 'lodash';

import {Link, withPrefix} from '../utils';

export default class PortfolioItem extends React.Component {
    render() {
        let project = _.get(this.props, 'project_page', null);
        return (
            <article className="cell project-card">
              <Link href={withPrefix(_.get(project, 'stackbit_url_path', null))} className="project-card__link">
                {_.get(project, 'thumb_image', null) && (
                <div className="project-card__image">
                  <img src={withPrefix(_.get(project, 'thumb_image', null))} alt={_.get(project, 'thumb_image_alt', null)} />
                </div>
                )}
                <header className="project-card__header">
                  <h3 className="project-card__title">{_.get(project, 'title', null)}</h3>
                  {_.get(project, 'subtitle', null) && (
                  <div className="project-card__subtitle">
                    {_.get(project, 'subtitle', null)}
                  </div>
                  )}
                </header>
              </Link>
            </article>
        );
    }
}
