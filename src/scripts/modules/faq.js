class FaqAccordion {
  constructor(container) {
    this._container = document.querySelector(`.${container}__list`);
  }

  init() {
    this._questions = document.querySelectorAll('.faq__question');

    this._questions.forEach((question) => {
      question.addEventListener('click', () => {
        this._handleQuestionClick(question);
      });
      this._hide(question);
    });
  }

  _handleQuestionClick(question) {
    const isExpanded = question.dataset.expanded;

    if (isExpanded === 'true') {
      this._hide(question);
    } else {
      this._show(question);
    }
  }

  _show(question) {
    question.dataset.expanded = true;
    question.setAttribute('aria-expanded', true);

    question.classList.add('faq__question--opened');
    const answer = question.nextSibling;

    answer.style.maxHeight = `${answer.scrollHeight}px`;
    answer.classList.add('faq__answer-wrapper--opened');
  }

  _hide(question) {
    question.dataset.expanded = false;
    question.setAttribute('aria-expanded', false);

    question.classList.remove('faq__question--opened');
    const answer = question.nextSibling;

    answer.style.maxHeight = `0px`;
    answer.classList.remove('faq__answer-wrapper--opened');
  }
}

export default FaqAccordion;
