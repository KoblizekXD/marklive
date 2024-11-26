'use client'

import { NavItem } from "@/components/nav";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Home() {
  const [text, setText] = useState(() => (localStorage.getItem('current-document') || ''));

  return (
    <main className="flex h-screen flex-col">
      <nav className="flex items-center">
        <NavItem className="font-bold" href="/">Marklive</NavItem>
        <NavItem href="/browse">Saved</NavItem>
        <NavItem href="/browse">Browse</NavItem>
        <div className="ml-auto h-full">
          <button className="px-3 bg-blue-600 h-full">Publish</button>
        </div>
      </nav>
      <div className="flex-1 flex">
        <textarea defaultValue={text} placeholder="Start typing your Markdown..." onChange={t => {
          setText(t.currentTarget.value);
          localStorage.setItem('current-document', t.currentTarget.value);
        }} className="w-full font-mono caret-slate-200 text-slate-200 resize-none p-2 text-xl outline-none basis-1/2 bg-[#1E1E2E]" />
        <div className="bg-[#181825] basis-1/2">
          <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]} className={'p-2 text-xl'}
            components={{
              code(props) {
                const {children, className, node, ...rest} = props;
                const match = /language-(\w+)/.exec(className || '')
                oneDark['code[class*=\"language-\"]']['fontFamily'] = 'JetBrains Mono Variable'
                return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children || '').replace(/\n$/, '')}
                      language={match[1]}
                      style={oneDark}
                    />
                ) : (
                  <code {...rest} className={`${className} font-mono`}>
                    {children}
                  </code>
                ) 
              }
            }}>
            {text}
          </Markdown>
        </div>
      </div>
    </main>
  );
}
