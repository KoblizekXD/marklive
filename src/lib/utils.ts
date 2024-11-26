
export interface IMarkdownDocument {
  title: string;
  description: string;
  content: string;
}

export function createDocument(title?: string, description?: string, content?: string): IMarkdownDocument {
  return {
    title: title || content?.substring(0, 20) || 'Untitled',
    description: description || '',
    content: content || ''
  }
}

export function autoSaveLocalDocument(doc: IMarkdownDocument, i?: number): number {
  localStorage.setItem('current-document', doc.content);
  if (i !== undefined) {
    const saved = JSON.parse(localStorage.getItem('saved') || '[]');
    saved[i] = doc;
    localStorage.setItem('saved', JSON.stringify(saved));
    return i;
  } else {
    const saved = JSON.parse(localStorage.getItem('saved') || '[]');
    saved.push(doc);
    localStorage.setItem('saved', JSON.stringify(saved));
    return saved.length - 1;
  }
}

export function overrideDocument(content: string, i: number) {
  const saved = JSON.parse(localStorage.getItem('saved') || '[]');
  saved[i].content = content;
  localStorage.setItem('saved', JSON.stringify(saved));
}

export function autoSave(doc: string) {
  localStorage.setItem('current-document', doc);
}

export function getAutoLocalDocument(): string {
  return localStorage.getItem('current-document') || '';
}

export function getLocalDocuments(): IMarkdownDocument[] {
  return JSON.parse(localStorage.getItem('saved') || '[]');
}