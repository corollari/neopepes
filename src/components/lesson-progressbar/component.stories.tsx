import * as React from 'react';
import { storiesOf } from '@storybook/react';

import LessonProgressbar from '.';

const navigate = (chapterNum, lessonNum) => {
  console.log(`navigate to: /chapter/${chapterNum}/lesson/${lessonNum}`);
};

storiesOf('Lesson Progressbar', module)
  .add('default', () => (
    <LessonProgressbar navigate={navigate} chapterNumber={1} lessonNumber={3} total={5} />
  ))
  .add('min', () => (
    <LessonProgressbar navigate={navigate} chapterNumber={1} lessonNumber={1} total={5} />
  ))
  .add('max', () => (
    <LessonProgressbar navigate={navigate} chapterNumber={1} lessonNumber={5} total={5} />
  ));
