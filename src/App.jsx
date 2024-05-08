import MarkdownInput from './components/MarkdownInput';
import NoteDisplay from './components/NoteDisplay';
import { useState, useEffect } from 'react';
import SavedNotes from './components/SavedNotes';
import Showdown from 'showdown';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [markdownValue, setMarkdownValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  // Récupérer les données du localStorage lors du montage initial
  useEffect(() => {
    const savedNotesFromLocalStorage = JSON.parse(localStorage.getItem('savedNotes'));
    if (savedNotesFromLocalStorage) {
      setSavedNotes(savedNotesFromLocalStorage);
    }
  }, []);

  const handleNoteClick = (index) => {
    // Mettre à jour l'état avec le contenu complet de la note sélectionnée
    setTitleValue(savedNotes[index].title);
    setMarkdownValue(savedNotes[index].content);
    setSelectedNoteIndex(index);
  };
  
  const handleTextareaChange = (value) => {
    setMarkdownValue(value);
  };

  const handleTitleChange = (value) => {
    setTitleValue(value)
  }

  // Fonction de rappel pour recevoir les nouvelles notes enregistrées
  const handleNoteSave = (title, content) => {
    // Convertir le contenu markdown en HTML avant de l'ajouter aux notes enregistrées
    const converter = new Showdown.Converter();
    const htmlContent = converter.makeHtml(content);
    
    // Créer un nouvel objet représentant la nouvelle note avec le titre et le contenu HTML
    const newNote = { title, content: htmlContent };
    
    // Ajouter la nouvelle note à la liste des notes enregistrées
    setSavedNotes(prevNotes => [...prevNotes, newNote]);
    setShowNewNoteForm(false);
  };

  const handleNoteEdit = (index, updatedNote) => {
    const updatedNotes = [...savedNotes];
    updatedNotes[index] = updatedNote;
    setSavedNotes(updatedNotes);
  };
  
  const handleNoteDelete = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
  };

  // Effet pour mettre à jour le localStorage lorsque savedNotes change
  useEffect(() => {
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
  }, [savedNotes]);


  return (
    <>
      <h1>Bloc note</h1> 
      <hr />
      <br />
      <div className='d-flex notes'>
        <div className="col-md-4 mes__notes">
        <button className='btn btn-primary mb-4' onClick={() => setShowNewNoteForm(true)}>Créer une nouvelle note</button>
        <SavedNotes savedNotes={savedNotes} onNoteEdit={handleNoteEdit} onNoteDelete={handleNoteDelete} onNoteClick={handleNoteClick} />
          
        </div>
        <div className="col-md-8 nouvelle__note">
          {/* Afficher le formulaire si showNewNoteForm est vrai */}
          {showNewNoteForm && (
            <div className="new__formulaire">
              <MarkdownInput onTextareaChange={handleTextareaChange} onNoteSave={handleNoteSave} onTitleChange={handleTitleChange} />
            </div>
          )}

          {/* Afficher NoteDisplay si markdownValue est défini et showNewNoteForm est faux */}
          {markdownValue && !showNewNoteForm && (
            <div className="new__affichage">
              <NoteDisplay markdownValue={markdownValue} titleValue={titleValue} />
            </div>
          )}

          {/* Afficher le contenu de la note sélectionnée si selectedNoteIndex est défini et showNewNoteForm est faux */}
          {selectedNoteIndex !== null && !markdownValue && !showNewNoteForm && (
            <div className="new__affichage__bis">
              <NoteDisplay markdownValue={savedNotes[selectedNoteIndex].content} titleValue={savedNotes[selectedNoteIndex].title} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
