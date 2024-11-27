'use client';

import { NavItem } from "@/components/nav";
import { getLocalDocuments, IMarkdownDocument, paginate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function filterDocuments(documents: IMarkdownDocument[], filter: string) {
  return documents.filter(doc => doc.title.toLowerCase().includes(filter.toLowerCase()) || doc.description.toLowerCase().includes(filter.toLowerCase()));
}

export default function SavePage() {
  const [pages, setPages] = useState<IMarkdownDocument[][]>([]);
  const router = useRouter();

  useEffect(() => {
    setPages(paginate(getLocalDocuments(), 12));
  }, []);

  return (
    <main className="flex h-screen flex-col">
      <nav className="flex items-center">
        <NavItem className="font-bold" href="/">
          Marklive
        </NavItem>
        <NavItem className="border-b" href="/saved">Saved</NavItem>
        <NavItem href="/browse">Browse</NavItem>
      </nav>
      <div className="flex-1 m-12 flex flex-col gap-y-4">
        <h1 className='text-3xl font-extrabold'>Locally saved documents</h1>
        <input onChange={e => {
          setPages(paginate(filterDocuments(getLocalDocuments(), e.target.value), 12));
        }} type='text' placeholder="Filter..." className="bg-[#11111B] outline-none rounded p-2" />
        <div className="flex-1 flex flex-col">
          {pages.map((page, i) => (
            <div key={i} className="flex gap-x-4 basis-1/3">
              {page.map((doc, j) => (
                <div key={j} className="flex border-gray-600 border p-2 basis-1/4 rounded flex-col gap-y-1">
                  <h1 className="text-xl font-semibold">{doc.title}</h1>
                  <p className="text-gray-500">{doc.description || 'No description'}</p>
                  <p className="flex-1 brightness-75">
                    {doc.content.substring(0, 100)}...
                  </p>
                  <button onClick={() => {
                    localStorage.setItem('current-document', doc.content);
                    localStorage.setItem('current-document-i', (i * 4 + j).toString());
                    router.push('/');
                  }} className="bg-blue-600 py-2 rounded">Open</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}