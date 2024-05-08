import Showdown from 'showdown';

const NoteDisplay = ({ titleValue, markdownValue }) => {
  //on instancie le convertisseur showdown markdown => html
  const converter = new Showdown.Converter();
  // conversion du Markdown en HTML
  const htmlContent = converter.makeHtml(markdownValue);

  return (
    <>
    <h3>{titleValue}</h3>
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
  };

export default NoteDisplay;
