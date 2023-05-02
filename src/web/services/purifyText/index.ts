import sanitizeHtml from 'sanitize-html';

export const purifyText = (text: string) => sanitizeHtml(text);
