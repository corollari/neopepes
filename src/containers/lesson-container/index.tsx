import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { setCh1Progress } from '../../redux/persist/index';
import * as H from 'history';
import ChapterCompleteCard from '../../components/chapter-complete-card';
import LessonProgressbar from '../../components/lesson-progressbar';
import Editor from '../../components/editor';
import InstructionViewer from '../../components/instruction-viewer';
import LessonNavigator from '../../components/lesson-navigator';
import { IMatch, CourseCodeType, CourseInstructionType } from '../../typings';
import CheatSheetModal from '../../components/cheat-sheet-modal';

interface IProps {
  setCh1Progress: (progress: number[]) => void;
  ch1Progress: number[];
  i18n: {
    language: string;
    changeLanguage: (lang: string) => void;
  };
  t: (key: string) => string;
  history: H.History;
  location: H.Location;
  match: IMatch;
  instructions: CourseInstructionType;
  codes: CourseCodeType;
  profile: any;
}
interface IState {
  code: string;
  codeForDiff: string;
  showAnswer: boolean;
}

class LessonContainer extends React.Component<IProps, IState> {
  public render(): React.ReactNode {
    const { codes, location, t } = this.props;

    const chapterNumber: number = this.getChapterNumber();
    const chapterIndex: number = chapterNumber - 1;
    const lessonNumber: number = this.getChatperNumber();
    const lessonIndex: number = lessonNumber - 1;
    const instruction = this.getInstruction();

    const codeLessonList = codes[chapterIndex] || [];

    const numOfTotalChapter: number = codes.length;

    const numOfTotalLesson: number = codeLessonList.length || 0;

    // Check if the current lesson is the end of this chapter.
    const isLastLesson: boolean = lessonNumber === numOfTotalLesson;

    const code = codeLessonList[lessonIndex] || { initialCode: undefined, answerCode: undefined };
    const { initialCode, answerCode } = code;

    const currentChapterText = `${t('chapter.chapter')} ${chapterNumber}`;
    const currentLessonText = `${t('lesson.lesson')} ${lessonNumber}`;
    const documentTitle: string = `NeoPepes - ${currentChapterText} ${currentLessonText}`;

    const { pathname } = location;
    return (
      <div>
        <Header {...this.props} />
        <Helmet>
          <title>{documentTitle}</title>
        </Helmet>
        <div className="container">
          <LessonProgressbar
            navigate={this.navigate}
            chapterNumber={chapterNumber}
            lessonNumber={lessonNumber}
            total={numOfTotalLesson}
            t={t}
          />
          <div className="py-2" />

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <InstructionViewer instruction={instruction} />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              {isLastLesson ? (
                <ChapterCompleteCard
                  navigate={this.navigate}
                  t={t}
                  total={numOfTotalChapter}
                  chapter={chapterNumber}
                />
              ) : (
                <Editor
                  initialCode={initialCode}
                  answerCode={answerCode}
                  t={t}
                  proceed={this.goNext}
                  pathname={pathname}
                />
              )}
            </div>
          </div>
          <div className="text-center">
            <div className="d-flex py-2 justify-content-between">
              <CheatSheetModal t={t} />
              <LessonNavigator
                goBack={this.goBack}
                goNext={this.goNext}
                lessonNumber={lessonNumber}
                total={numOfTotalLesson}
                t={t}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  public goNext = (): void => {
    const { codes } = this.props;
    // Check if code is undefined
    if (codes === undefined) {
      return;
    }
    const chapterNumber: number = this.getChapterNumber();
    const lessonNumber: number = this.getChatperNumber();

    this.updateProgress(chapterNumber, lessonNumber);
    this.navigateToNextLesson(chapterNumber, lessonNumber);
  };

  private goBack = (): void => {
    const { history } = this.props;
    const chapterNumber: number = this.getChapterNumber();
    const lessonNumber: number = this.getChatperNumber();
    const previousLessonPath = `/chapter/${chapterNumber}/lesson/${lessonNumber - 1}`;
    history.push(previousLessonPath);
  };

  private updateProgress = (currentChapter: number, currentLesson: number) => {
    const { ch1Progress } = this.props;

    ch1Progress[currentChapter - 1] = currentLesson;
    let newCh1Progress = ch1Progress;
    this.props.setCh1Progress(newCh1Progress);
  };

  private navigateToNextLesson = (currentChapter: number, currentLesson: number) => {
    const { codes } = this.props;

    // Check if code is undefined
    if (codes === undefined) {
      return;
    }

    this.navigate(currentChapter, currentLesson + 1);
  };

  private navigate = (chapterNum, lessonNum) => {
    const { history } = this.props;

    history.push(`/chapter/${chapterNum}/lesson/${lessonNum}`);
  };

  private getInstruction = () => {
    const { instructions, i18n } = this.props;
    const lang: string = i18n.language;

    const chapterNumber = this.getChapterNumber();
    const chapterIndex = chapterNumber - 1;
    const lessonNumber = this.getChatperNumber();
    const lessonIndex = lessonNumber - 1;

    const intructionsLocalized = instructions[lang];
    const chapter = intructionsLocalized[chapterIndex] || {};

    const instructionLessonList = chapter.lessons || [];
    const instruction = instructionLessonList[lessonIndex] || {};

    return instruction;
  };

  private getChapterNumber = (): number => {
    const { match } = this.props;
    const routeParams = match.params;
    return parseInt(routeParams.chapter, 10);
  };

  private getChatperNumber = (): number => {
    const { match } = this.props;
    const routeParams = match.params;
    return parseInt(routeParams.lesson, 10);
  };
}

// @ts-ignore
const WithTranslation = withNamespaces()(LessonContainer);
// @ts-check
const mapStateToProps = (state) => ({
  instructions: state.course.courseInstructions,
  codes: state.course.courseCodes,
  ch1Progress: state.persist.ch1Progress
});

const mapDispatchToProps = (dispatch) => ({
  setCh1Progress: (localProgress) => dispatch(setCh1Progress(localProgress))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTranslation);
