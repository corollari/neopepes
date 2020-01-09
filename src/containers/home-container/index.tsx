import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/header';
import { Button } from 'react-fn-components';
import { paths } from '../../routes';
import A from '../../assets/images/pepe.png';

const Home = (props) => {
  const { history } = props;
  const documentTitle = `NeoPepes - Home`;
  return (
    <div>
      <Header {...props} />
      <Helmet>
        <title>{documentTitle}</title>
      </Helmet>

      <section
        style={{
          paddingTop: 180,
          paddingBottom: 160,
          backgroundColor: '#162255',
          color: 'white'
        }}
      >
        <div className="container d-flex">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div className="my-5">
                <h1 style={{ marginTop: 120 }}>
                  <b>LEARN TO CODE SMART CONTRACTS ON NEO</b>
                </h1>

                <p className="py-3">A step by step interactive tutorial centered around writing, deploying and interacting with Smart Contracts on the NEO blockchain</p>
                <Button
                  className="px-5"
                  level="secondary"
                  theme="dark"
                  onClick={() => history.push(paths.chapterList)}
                  text="Get Started"
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div>
                <img
                  className="img-fluid mx-auto"
                  src={A}
                  alt="asset a"
                  style={{ marginTop: 50 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
