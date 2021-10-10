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

function parseFormattedTextAsHtml(text: string): string {
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

export function parseTalentValuesAsTableRow(
  text: string,
  params: {
    [key: string]: number[];
  }
): React.ReactNode {
  const [talentName, talentValues] = text.split('|');
  if (talentName === undefined || talentValues === undefined) {
    return undefined;
  }

  return (
    <tr key={text}>
      <th>{talentName}</th>
      {Array.from({ length: 15 }, (_, i) => (
        <td key={i}>{parseTalentValueString(talentValues, i + 1, params)}</td>
      ))}
    </tr>
  );
}

function parseTalentValueString(
  text: string,
  level: number,
  params: {
    [key: string]: number[];
  }
): string {
  const parser = new TextParser();

  // Parses {paramX:I/P}
  parser.addRule(/{.*?:.*?}/g, (tag) =>
    parseTalentValue(tag.slice(1, tag.length - 1), level, params)
  );

  return parser.render(text);
}

function parseTalentValue(
  text: string,
  level: number,
  params: {
    [key: string]: number[];
  }
): string {
  const [paramI, parseType] = text.split(':');
  if (paramI === undefined || parseType === undefined) {
    return '';
  }

  const param = params[paramI];
  if (param === undefined) {
    return '';
  }

  const value = param[level - 1];
  if (value === undefined) {
    return '';
  }

  switch (parseType) {
    case 'I':
      return value.toFixed(0);
    case 'P':
      return (value * 100).toFixed(0).concat('%');
    case 'F1':
      return value.toFixed(1);
    case 'F1P':
      return (value * 100).toFixed(1).concat('%');
    default:
      return value.toString();
  }
}
