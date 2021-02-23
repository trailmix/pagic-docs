// deno-lint-ignore-file no-explicit-any
import { React } from './deps.ts';
import type { PagicLayout } from './deps.ts';
import throttle from 'https://cdn.pagic.org/lodash@4.17.20/esnext/throttle.js';

import Loading from './_loading.tsx';
import { dateFormatter } from './_utils.tsx';

const Main: PagicLayout = (props) => {
  const { config, content, contentTitle, contentBody, blog, author, date, loading, toc, prev, next, gitalk } = props;

  React.useEffect(() => {
    if (window.Deno) {
      return;
    }
    const scrollHandler = () => {

      const anchorPositionMap = new Map<any, 'aboveViewport' | 'inViewport' | 'belowViewport'>();
      // @ts-ignore comment
      for (const a of window.Deno.document.querySelectorAll('.toc a')) {
        // @ts-ignore comment
        const bounding = document.getElementById(a.hash.slice(1)).getBoundingClientRect();
        const belowTop = bounding.y > 64;
        // @ts-ignore comment
        const aboveBottom = bounding.y + bounding.height + 16 <= window.innerHeight;
        if ((belowTop && aboveBottom) || (!belowTop && !aboveBottom)) {
          anchorPositionMap.set(a, 'inViewport');
        } else if (belowTop && !aboveBottom) {
          anchorPositionMap.set(a, 'belowViewport');
        } else if (!belowTop && aboveBottom) {
          anchorPositionMap.set(a, 'aboveViewport');
        }
      }
      let activeAnchor = null;
      for (const [a, position] of anchorPositionMap) {
        if (position === 'aboveViewport') {
          activeAnchor = a;
        } else if (position === 'inViewport') {
          if (activeAnchor === null) {
            activeAnchor = a;
            break;
          }
        }
      }
      if (activeAnchor) {
        // @ts-ignore comment
        document.querySelectorAll('.toc a.active').forEach((node) => node.classList.remove('active'));
        activeAnchor.classList.add('active');
      }
    };
    window.addEventListener('scroll', throttle(scrollHandler, 100));
    scrollHandler();
  }, []);
  return (
    <section className="main">
      <div className="main_article">
        {loading ? (
          <Loading />
        ) : blog?.isPost ? (
          <>
            {contentTitle}
            {date && (
              <div className="main_post_meta">
                <time dateTime={date.toString()}>{dateFormatter['yyyy-MM-dd'](date)}</time> · {author ?? 'unknown'}
              </div>
            )}
            {contentBody}
          </>
        ) : (
          content
        )}
        {(prev || next) && (
          <div className="prev_next">
            {prev && (
              <a className="prev button" href={`${config.root}${prev.link}`}>
                «&nbsp;&nbsp;{prev.text}
              </a>
            )}
            {next && (
              <a className="next button" href={`${config.root}${next.link}`}>
                {next.text}&nbsp;&nbsp;»
              </a>
            )}
          </div>
        )}
        {gitalk}
      </div>
      {toc && (
        <aside className="main_toc_container nav_link_container">
          <div className="main_toc">
            {config.tocAd && <div className="toc_ad">{config.tocAd}</div>}
            {toc}
          </div>
        </aside>
      )}
    </section>
  );
};

export default Main;
