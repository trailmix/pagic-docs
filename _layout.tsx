// deno-lint-ignore-file no-undef
import { React } from "./_deps.ts";
import type { PagicLayout } from "./_deps.ts";
import Head from "./_head.tsx";
import Header from "./_header.tsx";
import Sidebar from "./_sidebar.tsx";
import Main from "./_main.tsx";
import Footer from "./_footer.tsx";
import Tools from "./_tools.tsx";
import { classnames } from "./_utils.tsx";

// @ts-ignore need for parse
const Layout: PagicLayout = (props) => {
  const [isDark, setIsDark] = React.useState(
    window.Deno ? false : // @ts-ignore need for parse
      document.documentElement.classList.contains("is_dark"),
  );
  return (
    <html className={classnames({ is_dark: isDark })}>
      <Head {...props} isDark={isDark} />
      <body>
        <Header {...props} isDark={isDark} setIsDark={setIsDark} />
        <Sidebar {...props} />
        <Main {...props} />
        <Footer {...props} />
        <Tools {...props} />
        {props.script}
      </body>
    </html>
  );
};

export default Layout;
