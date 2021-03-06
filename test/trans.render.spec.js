import React from 'react';
import { shallow, render, mount } from 'enzyme';
import i18n from './i18n';
import translate from '../src/translate';
import Trans from '../src/trans';

const context = {
  i18n
};

function Link({ to, children }) {
  return <a href={to}>{children}</a>;
}

describe('trans simple', () => {
  const TestElement = ({ t }) => {
    const count = 10;
    const name = "Jan";
    return (
      <Trans i18nKey="transTest1">
        Open <Link to="/msgs">here</Link>.
      </Trans>
    );
  }

  it('should render correct content', () => {
    const HocElement = translate(['translation'], {})(TestElement);

    const wrapper = mount(<HocElement />, { context });
    // console.log(wrapper.debug());
    expect(wrapper.contains(
      <div>
        Go <Link to="/msgs">there</Link>.
      </div>
    )).toBe(true);
  });
});

describe('trans complex', () => {
  const TestElement = ({ t }) => {
    const count = 10;
    const name = "Jan";
    return (
      <Trans i18nKey="transTest2" count={count}>
        Hello <strong>{{name}}</strong>, you have {{count}} message. Open <Link to="/msgs">here</Link>.
      </Trans>
    );
  }

  it('should render correct content', () => {
    const HocElement = translate(['translation'], {})(TestElement);

    const wrapper = mount(<HocElement />, { context });
    // console.log(wrapper.debug());
    expect(wrapper.contains(
      <div>
        Hello <strong>Jan</strong>, you have 10 messages. Open <Link to="/msgs">here</Link>.
      </div>
    )).toBe(true);
  });
});
