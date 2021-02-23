import { React } from "../deps.ts";
import type { PagicLayout } from "../deps.ts";

import Head from "../_head.tsx";
import Header from "../_header.tsx";
import Sidebar from "../_sidebar.tsx";
import Main from "../_main.tsx";
import Archives from "./_archives.tsx";
import Footer from "../_footer.tsx";
import Tools from "../_tools.tsx";
import { classnames } from "../_utils.tsx";

const Layout: PagicLayout = (props) => {
  const [isDark, setIsDark] = React.useState(
    window.Deno ? false : // deno-lint-ignore no-undef
      document.documentElement.classList.contains("is_dark"),
  );
  return (
    <html className={classnames({ is_dark: isDark })}>
      <Head {...props} isDark={isDark} />
      <body>
        <Header {...props} isDark={isDark} setIsDark={setIsDark} />
        <Sidebar {...props} />
        {props.blog?.isPost ? <Main {...props} /> : <Archives {...props} />}
        <Footer {...props} />
        <Tools {...props} />
        {props.script}
      </body>
    </html>
  );
};

export default Layout;
