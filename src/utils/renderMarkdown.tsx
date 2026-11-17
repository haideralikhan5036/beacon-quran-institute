import type { ReactNode } from 'react';

// Small, safe Markdown renderer for the blog articles (blogData.ts).
// Only **bold**, *italic*, ### headings, --- rules and - / 1. lists are
// supported. Content is rendered as React nodes, so any HTML in the text is
// escaped by React — never injected with dangerouslySetInnerHTML.

const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_RE).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

const LIST_ITEM_RE = /^(?:[0-9٠-٩]+[.)]|[-•])\s+/;

function renderListItem(line: string, key: number): ReactNode {
  return (
    <li key={key} className="font-medium text-amber-100/95">
      {renderInline(line.replace(LIST_ITEM_RE, ''))}
    </li>
  );
}

// Line-based: a heading and the list that follows it live in the same
// paragraph block in blogData, so a block-based parser would drop the list.
export function renderMarkdown(content: string): ReactNode[] {
  const out: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = (key: number) => {
    if (para.length === 0) return;
    out.push(
      <p key={`p-${key}`} className="font-medium">
        {renderInline(para.join(' '))}
      </p>,
    );
    para = [];
  };
  const flushList = (key: number) => {
    if (list.length === 0) return;
    out.push(
      <ul key={`ul-${key}`} className="list-disc pl-6 pr-6 space-y-3 my-4">
        {list.map((line, i) => renderListItem(line, i))}
      </ul>,
    );
    list = [];
  };

  content.split('\n').forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) {
      flushPara(idx);
      flushList(idx);
      return;
    }
    if (/^---+$/.test(line)) {
      flushPara(idx);
      flushList(idx);
      out.push(<hr key={`hr-${idx}`} className="border-white/10 my-2" />);
      return;
    }
    if (line.startsWith('### ')) {
      flushPara(idx);
      flushList(idx);
      out.push(
        <h4 key={`h-${idx}`} className="text-xl sm:text-2xl font-bold display text-amber-200 mt-8 mb-4">
          {renderInline(line.replace(/^###\s+/, ''))}
        </h4>,
      );
      return;
    }
    if (line.startsWith('## ')) {
      flushPara(idx);
      flushList(idx);
      out.push(
        <h3 key={`h-${idx}`} className="text-2xl sm:text-3xl font-bold display text-amber-200 mt-8 mb-4">
          {renderInline(line.replace(/^##\s+/, ''))}
        </h3>,
      );
      return;
    }
    if (LIST_ITEM_RE.test(line)) {
      flushPara(idx);
      list.push(line);
      return;
    }
    flushList(idx);
    para.push(line);
  });

  flushPara(content.length);
  flushList(content.length);
  return out;
}
