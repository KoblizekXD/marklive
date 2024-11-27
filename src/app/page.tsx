"use client";

import { NavItem } from "@/components/nav";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { autoSave, autoSaveLocalDocument, createDocument, getLocalDocuments, overrideDocument } from "@/lib/utils";
import { Dialog } from "@/components/dialog";

export default function Home() {
  const [text, setText] = useState("");
  const [currentlyEditing, setCurrentlyEditing] = useState<number | undefined>(undefined);
  const [currentlyEditingTitle, setCurrentlyEditingTitle] = useState<string | undefined>(undefined);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  useEffect(() => {
    setText(localStorage.getItem("current-document") || "");
    const item = localStorage.getItem('current-document-i');
    if (item !== null) {
      const res = parseInt(item);
      setCurrentlyEditing(!isNaN(res) ? res : undefined);
    }
  }, []);

  useEffect(() => {
    if (currentlyEditing !== undefined)
      setCurrentlyEditingTitle(getLocalDocuments()[currentlyEditing].title)
  }, [currentlyEditing]);

  return (
    <main className="flex h-screen flex-col">
      {showSaveDialog && (
        <Dialog onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const i = autoSaveLocalDocument(createDocument(fd.get('name') as string, fd.get('description') as string, text), currentlyEditing);
          setCurrentlyEditing(i);
          localStorage.setItem('current-document-i', i.toString());
          setShowSaveDialog(false);
        }} className="gap-y-2 lg:w-1/5">
          <h1 className="font-semibold text-xl">Save document</h1>
          <label className="flex flex-col">
            Name
            <input className="bg-[#181825] rounded p-2" name="name" />
          </label>
          <label className="flex flex-col">
            Description
            <input className="bg-[#181825] rounded p-2" name="description" />
          </label>
          <div className="flex gap-x-2">
            <button type="submit" className="bg-blue-500 p-2 rounded basis-1/2">
              Save
            </button>
            <button onClick={() => setShowSaveDialog(false)} className="basis-1/2 bg-red-500 rounded p-2">
              Cancel
            </button>
          </div>
        </Dialog>
      )}
      <nav className="flex sm:hidden pl-2 bg-black fixed bottom-0 left-0 right-0 h-12">
        {currentlyEditing && 
          <button onClick={() => {
            setCurrentlyEditing(undefined);
            localStorage.setItem('current-document-i', '');
            localStorage.setItem('current-document', '');
            setText('');
            setCurrentlyEditingTitle(undefined);
          }} className='text-gray-600'>
            New
          </button>
        }
        <div className="ml-auto flex h-full">
            <button
              onClick={() => {
                if (currentlyEditing === undefined) {
                  setShowSaveDialog(true);
                  return;
                }

                overrideDocument(text, currentlyEditing);
                console.log('Saved');
              }}
              className="px-4 hover:brightness-75 h-full"
            >
              Save
            </button>
            <button className="px-4 hover:brightness-75 bg-blue-600 h-full">
              Publish
            </button>
          </div>
      </nav>
      <nav className="flex items-center">
        <NavItem className="font-bold border-b" href="/">
          Marklive
        </NavItem>
        <NavItem href="/saved">Saved</NavItem>
        <NavItem href="/browse">Browse</NavItem>
        {currentlyEditingTitle && <h1 className="font-semibold ml-auto sm:ml-0 pr-2 text-gray-500 text-xl">{currentlyEditingTitle}</h1>}
        <div className="ml-auto sm:flex hidden h-full">
          {currentlyEditing !== undefined && 
            <button onClick={() => {
              setCurrentlyEditing(undefined);
              localStorage.setItem('current-document-i', '');
              localStorage.setItem('current-document', '');
              setText('');
              setCurrentlyEditingTitle(undefined);
            }} className='text-gray-600'>
              New
            </button>
          }
          <button
            onClick={() => {
              if (currentlyEditing === undefined) {
                setShowSaveDialog(true);
                return;
              }

              overrideDocument(text, currentlyEditing);
              console.log('Saved');
            }}
            className="px-4 hover:brightness-75 h-full"
          >
            Save
          </button>
          <button className="px-4 hover:brightness-75 bg-blue-600 h-full">
            Publish
          </button>
        </div>
      </nav>
      <div className="flex-1 flex flex-col sm:flex-row">
        <textarea
          spellCheck={false}
          defaultValue={text}
          placeholder="Start typing your Markdown..."
          onChange={(t) => {
            setText(t.currentTarget.value);
            autoSave(t.currentTarget.value);
          }}
          className="w-full font-mono caret-slate-200 text-slate-200 resize-none p-2 text-xl outline-none basis-1/2 bg-[#1E1E2E]"
        />
        <div className="bg-[#181825] sm:border-l-[#11111B] sm:border-l basis-1/2">
          <Markdown
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            className={"p-2 text-slate-200 text-xl"}
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                oneDark['code[class*="language-"]']["fontFamily"] =
                  "JetBrains Mono Variable";
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={oneDark}
                  >{String(children || "").replace(/\n$/, "")}</SyntaxHighlighter>
                ) : (
                  <code {...rest} className={`${className} font-mono`}>
                    {children}
                  </code>
                );
              },
              h1: (props) => (
                <h1 className="font-extrabold text-4xl underline" {...props} />
              ),
              h2: (props) => <h1 className="font-bold text-3xl" {...props} />,
              h3: (props) => (
                <h1 className="font-semibold text-2xl" {...props} />
              ),
              h4: (props) => <h1 className="text-xl" {...props} />,
            }}
          >
            {text}
          </Markdown>
        </div>
      </div>
    </main>
  );
}
