/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";

import { colors } from "@styles/colors";
import { opacity } from "@styles/utils";

const StyledInternalLink = styled(Link)`
  text-decoration: none;
  color: ${colors.darkBrown};
  &:hover {
    ${opacity}
  }
`;
type InternalLinkProps = {
  path: string;
  children: string | JSX.Element;
};
export function InternalLink(props: InternalLinkProps) {
  const { path, children } = props;
  return <StyledInternalLink href={path}>{children}</StyledInternalLink>;
}

const StyledExternalLink = styled.a`
  // text-decoration: none is to remove underline from <a> tag.
  // https://html-coding.co.jp/annex/dictionary/css/text-decoration/
  text-decoration: none;
  &:hover {
    ${opacity}
    text-decoration: underline; // Add underline when hovering over <a> tag.
  }
`;
type ExternalLinkProps = {
  url: string;
  children: string | JSX.Element;
  color?: string;
  tooltip?: string;
};
export function ExternalLink(props: ExternalLinkProps) {
  const { url, children, color, tooltip } = props;
  return (
    <StyledExternalLink
      href={url}
      // target="_blank" is to open a link in a new tab. On the other hand, target="_self" is to open a link in the same tab.
      // * But now, window.opener doesn't work as well as rel="noopener" by default when target="_blank" is set in <a> tag.
      // https://web-camp.io/magazine/archives/82442
      target="_blank"
      // Linked page can access the original page by using window.opener when target="_blank" is set.
      // So, set rel="noopener" to prevent the linked page from accessing the original page.
      // https://developer.mozilla.org/ja/docs/Web/HTML/Link_types/noopener
      // Linked page can know the original page's URL by using window.referrer (Referer header) when target="_blank" is set.
      // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referer
      // So set rel="noreferrer" to prevent the linked page from knowing the original page's URL.
      // * And rel="noreferrer" includes rel="noopener" so you don't need to set rel="noopener" when you set rel="noreferrer".
      // https://developer.mozilla.org/ja/docs/Web/HTML/Attributes/rel/noreferrer
      // https://myajo.net/tips/10672/#target%22_blank%22%E3%81%AE%E8%84%86%E5%BC%B1%E6%80%A7%E5%AF%BE%E7%AD%96
      rel="noreferrer"
      // title is to show a tooltip when you hover the mouse over the link.
      // https://www.tagindex.com/html/attribute/title.html
      title={tooltip}
      css={css`
        color: ${color};
      `}
    >
      {children}
    </StyledExternalLink>
  );
}

const StyledLinkNoUnderline = styled.a`
  text-decoration: none;
  &:hover {
    ${opacity}
  }
`;
type ExternalLinkNoUnderlineProps = {
  url: string;
  children: string | JSX.Element;
  color?: string;
  tooltip?: string;
};
export const ExternalLinkNoUnderline = (
  props: ExternalLinkNoUnderlineProps
) => {
  const { url, children, color, tooltip } = props;
  return (
    <StyledLinkNoUnderline
      href={url}
      target="_blank"
      rel="noreferrer"
      title={tooltip}
      css={css`
        color: ${color};
      `}
    >
      {children}
    </StyledLinkNoUnderline>
  );
};
