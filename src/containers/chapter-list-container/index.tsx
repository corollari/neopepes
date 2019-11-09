import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Helmet } from 'react-helmet';
import * as H from 'history';
import { CourseInstructionType } from '../../typings';
import ChapterList from '../../components/chapter-list';
import { Spinner } from 'react-fn-components';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './style.css';

interface IProps {
  t: (key: string) => string;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => void;
  };
  history: H.History;
  location: H.Location;
  instructions: CourseInstructionType;
  profile: any;
  ch1Progress: number[];
}

class ChapterContainer extends React.Component<IProps, {}> {
  public render(): React.ReactNode {
    const { instructions, i18n, t, ch1Progress } = this.props;
    const lang: string = i18n.language;
    if (instructions === undefined || instructions[lang] === undefined) {
      return (
        <div className="text-center py-5">
          <Spinner />
        </div>
      );
    }

    const intructionsLocalized = instructions[lang];
    const documentTitle = `NeoPepes - An interactive tutorial on Neo smart contracts`;

    return (
      <div>
        <Header {...this.props} />
        <Helmet>
          <title>{documentTitle}</title>
        </Helmet>
        <div className="container">
          <div className="chapter-list-container">
            <div className="row py-5">
              <div className="col-sm-10 col-md-8 col-lg-5 mr-auto ml-auto text-center">
                <h3>{t('chapter.listTitle')}</h3>
                <br />
                <ChapterList
                  chapterList={intructionsLocalized}
                  ch1Progress={ch1Progress}
                  navigate={this.navigate}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  private navigate = (chapterNum, lessonNum) => {
    const { history } = this.props;

    const startingChapterPath = `/chapter/${chapterNum}/lesson/${lessonNum}`;
    return history.push(startingChapterPath);
  };
}

// @ts-ignore
const WithTranslation = withNamespaces()(ChapterContainer);
// @ts-check
const mapStateToProps = (state) => ({
  instructions: state.course.courseInstructions,
  ch1Progress: state.persist.ch1Progress
});

export default connect(
  mapStateToProps,
  null
)(WithTranslation);
