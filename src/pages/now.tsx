import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Content, Footer, Navbar, Banner, CardHero, ContentParser, withLayoutPage } from '@/components';
import { MDContent, getContentMultiLanguage } from '@/server/content-parser';
import { Fragment } from 'react';
import { DEFAULT_LOCALE } from '@/utils/config';

type Props = {
  contents: MDContent;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE
  } = ctx;
  const contents = await getContentMultiLanguage('now', locale);
  return {
    props: {
      contents
    }
  };
};

const NowPage: NextPage<Props> = (props) => {
  const { contents } = props;
  const { meta, content } = contents;
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner
        bgImage={meta.image}
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="-mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white">
            {meta.title}
          </h1>
          <p className="text-lg px-8 text-white dark:text-white">
            {meta.description}”
          </p>
        </div>
      </Banner>
      <Content>
        <CardHero>
          <ContentParser>
            {content}
          </ContentParser>
        </CardHero>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(NowPage, (props) => {
  const { title } = props.contents.meta;
  return {
    title
  };
});
