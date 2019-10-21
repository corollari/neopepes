import React, { useState, useEffect, useRef } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { paths } from '../../routes';

const useClickOutside = (ref, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && callback) {
      callback();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

const Header = (props) => {
  const [isTogglerOpen, setIsTogglerOpen] = useState(false);
  const togglerRef = useRef(null);

  useClickOutside(togglerRef, () => setIsTogglerOpen(false));

  const { t, location } = props;
  const { pathname } = location;

  const toggle = () => {
    setIsTogglerOpen(!isTogglerOpen);
  };

  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark ${
        pathname === paths.home ? 'fixed-top' : ''
      }`}
      style={{ backgroundColor: '#162255' }}
      ref={togglerRef}
    >
      <Link className="navbar-brand" to={paths.home} aria-label={'brand'}>
        {'NeoPepes'}
      </Link>

      <button className="navbar-toggler" onClick={toggle} aria-label={'menu'}>
        <span className="navbar-toggler-icon" />
      </button>

      <div
        data-testid={`collapse-${isTogglerOpen ? 'opened' : 'closed'}`}
        className={`collapse ${isTogglerOpen ? 'show' : ''} navbar-collapse`}
      >
        <ul className="ml-auto navbar-nav">
          <li className="nav-item" style={{ marginLeft: '1rem' }}>
            <Link
              className={`nav-link ${pathname === paths.home ? 'active' : ''}`}
              to={paths.home}
              aria-label={'home'}
            >
              {t('link.home')}
            </Link>
          </li>

          <li className="nav-item" style={{ marginLeft: '1rem' }}>
            <Link
              className={`nav-link ${pathname === paths.chapterList ? 'active' : ''}`}
              to={paths.chapterList}
              aria-label={'tutorial'}
            >
              {t('link.tutorial')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// @ts-ignore
const withTrans = withNamespaces()(Header);

const mapStateToProps = (state) => ({
  ch1Progress: state.persist.ch1Progress
});

export default connect(
  mapStateToProps,
  null
)(withTrans);
