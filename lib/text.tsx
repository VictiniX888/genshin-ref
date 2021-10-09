import { Parser as TextParser } from 'simple-text-parser';
import parseHtml, { Element, domToReact } from 'html-react-parser';
import { Card } from 'react-bootstrap';

export function parseFormattedTextAsCardText(text: string): React.ReactNode {
  const rawHtml = parseFormattedTextAsHtml(text);
  return parseHtml(rawHtml, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.tagName === 'p') {
        return <Card.Text>{domToReact(domNode.children)}</Card.Text>;
      }
    },
  });
}

export function parseFormattedTextAsHtml(text: string): string {
  if (text === '') {
    return text;
  }

  const parser = new TextParser();

  // Encloses text in p block
  // text => <p>text</p>
  text = '<p>'.concat(text).concat('</p>');

  // Transforms double newlines into paragraph breaks
  // \n\n => </p><p>
  parser.addRule(/\n{2}/g, () => '</p><p>');

  // Replaces newline with html linebreaks
  // \n => <br />
  parser.addRule(/\n/g, () => '<br />');

  // Bolds text between double asterisks
  // **text** => <strong>text</strong>
  parser.addRule(
    /\*{2}(.*?)\*{2}/g,
    (tag) => `<strong>${tag.slice(2, tag.length - 2)}</strong>`
  );

  // Converts small dot into bigger dot with space for lists
  parser.addRule(/·/g, () => '• ');

  return parser.render(text);
}
