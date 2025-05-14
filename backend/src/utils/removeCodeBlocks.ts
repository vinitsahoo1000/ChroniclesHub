import { JSDOM } from 'jsdom';

export function stripHtmlWithDOM(html: string): string {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const codeBlocks = doc.querySelectorAll('pre code');
    codeBlocks.forEach(block => block.parentElement?.remove());
    return doc.body.textContent || '';
}
