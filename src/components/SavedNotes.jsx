import {useState} from 'react';
import Card from 'react-bootstrap/Card';


const SavedNotes = ({ savedNotes, onNoteEdit, onNoteDelete, onNoteClick }) => {
  // initialisation des états de départ : index note en cours et note en cours d'édition
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNote, setEditedNote] = useState({ title: '', content: '' });

  // fonction appelée quand on clique sur le btn modifier : màj de l'editingindex avec l'index de la note en cours d'édition et l'état editNote avec les données de la note
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedNote(savedNotes[index]);
  };

  //fonction appelée quand on enregistre la note modifiée. Appelle la fction de rappel onNoteEdit ac index de la note + données modifiées, puis elle reset les données de setEditednote
  const handleSaveEdit = () => {
    onNoteEdit(editingIndex, editedNote);
    setEditingIndex(null);
    setEditedNote({ title: '', content: '' });
  };

  //fonction appelée lorsque l'utilisateur écrit dans les champs title et content pour lédition de la note. Màj état d'editedNote avec les nouvelles valeurs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

   //appelle la fonction de rappel onNoteDelete avec index de la note à supprimer
   const handleDeleteClick = (index) => {
    onNoteDelete(index);
  };

  return (
    <div>
      <h2>Mes notes :</h2>
      
        {/* pour chque note on vérifie si elle est en cours d'édition ou pas : si oui --> formulaire d'édition, sinon --> afficahge normal de la note */}
        {savedNotes.map((note, index) => (
          <Card className="affichage__notes" key={index} >
            {editingIndex === index ? (
              <>
                <input type="text" name="title" placeholder="Titre de la note" value={editedNote.title} onChange={handleInputChange} />
                <textarea name="content" placeholder="Contenu de la note" value={editedNote.content} onChange={handleInputChange} />
                <button className='btn btn-primary' onClick={handleSaveEdit}>Enregistrer</button>
              </> ) : (
              <>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: note.content.substring(0, 50) }} />
                <button className='btn btn-primary' onClick={() => onNoteClick(index)}>Afficher la note</button>
                <button className='btn btn-primary' onClick={() => handleEditClick(index)}>Modifier</button>
                <button className='btn btn-primary' onClick={() => handleDeleteClick(index)}>Supprimer</button>
              </>
            )}
          </Card>
        ))}
     
    </div>
  );
};

export default SavedNotes;